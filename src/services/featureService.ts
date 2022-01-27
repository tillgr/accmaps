import { GeoJSON, Icon, LatLng, Marker } from "leaflet";
import { featureDescriptionHelper } from "../utils/featureDescriptionHelper";
import { featureAccessibilityProperties } from "../data/featureAccessibilityProperties";
import UserService from "../services/userService";
import * as string from '../../public/strings/lang.en.json';

import {
  COLORS,
  FILL_OPACITY,
  MARKERS_IMG_DIR,
  WALL_WEIGHT,
  WALL_WEIGHT_PAVING,
} from "../data/constants";
import { UserGroupEnum } from "../models/userGroupEnum";
import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserFeatureSelection } from "../data/userFeatureSelection";

const polygonCenter = require("geojson-polygon-center");

function getAccessibilityDescription(feature: GeoJSON.Feature): string {
  let popUpText = feature.properties.ref ?? "(no name)";

  if (
    feature.properties.name !== undefined &&
    feature.properties.name.length !== 0
  ) {
    popUpText += " (" + feature.properties.name + ")";
  }

  popUpText += featureDescriptionHelper(
    feature,
    featureAccessibilityProperties
  );

  return string.selectedMapObjectPrefix + popUpText;
}

function getAccessibilityMarker(feature: GeoJSON.Feature): Marker {
  let iconFileName = "";

  const isFeatureAccessible = featureAccessibilityProperties.some(
    ({ accessibilityFunction, iconFilename, userGroups }) => {
      if (
        userGroups.includes(UserService.getCurrentProfile()) &&
        accessibilityFunction(feature) &&
        iconFilename !== undefined
      ) {
        iconFileName = iconFilename;
        return true;
      }
      return false;
    }
  );

  if (isFeatureAccessible) {
    const featureCenter = polygonCenter(feature);
    const featureCenterLatLng = new LatLng(
      featureCenter.coordinates[1],
      featureCenter.coordinates[0]
    );

    const icon = new Icon({
      iconUrl: MARKERS_IMG_DIR + iconFileName,
      iconSize: [48, 48],
    });

    return new Marker(featureCenterLatLng, {
      icon: icon,
    });
  }
  return null;
}

function getFeatureStyle(feature: GeoJSON.Feature<any>): any {
  let fill = "#fff";

  if (feature.properties.amenity === "toilets") {
    fill = COLORS.TOILET;
  } else if (
    feature.properties.stairs ||
    (feature.properties.highway &&
      (feature.properties.highway == "elevator" ||
        feature.properties.highway == "escalator"))
  ) {
    fill = COLORS.STAIR;
  } else if (feature.properties.indoor === "room") {
    fill = COLORS.ROOM;
  }

  return {
    fillColor: fill,
    weight: getWallWeight(feature),
    color: COLORS.WALL,
    fillOpacity: FILL_OPACITY,
  };
}

function getWallWeight(feature: GeoJSON.Feature<any>) {
  //highlight tactile paving lines
  //decides wall weight based on the user profile and feature
  return UserService.getCurrentProfile() == UserGroupEnum.blindPeople &&
    feature.geometry.type === "LineString" &&
    feature.properties.tactile_paving === "yes"
    ? WALL_WEIGHT_PAVING
    : WALL_WEIGHT;
}

export function getCurrentFeatures(): Map<UserFeatureEnum, boolean> {
  const currentlySelectedFeatures: Map<UserFeatureEnum, boolean> =
    localStorage.getItem("currentlySelectedFeatures")
      ? new Map(JSON.parse(localStorage.currentlySelectedFeatures))
      : (() => {
          const defaultSelectedFeatures = new Map();
          UserFeatureSelection.forEach((v, k) => {
            defaultSelectedFeatures.set(k, v.isCheckedDefault);
          });
          //console.log(defaultSelectedFeatures);
          return defaultSelectedFeatures;
        })();

  return currentlySelectedFeatures;
}

export function setCurrentFeatures(
  checkboxState: Map<UserFeatureEnum, boolean>
): void {
  localStorage.currentlySelectedFeatures = JSON.stringify(
    Array.from(checkboxState.entries())
  );
}

export default {
  getAccessibilityDescription,
  getAccessibilityMarker,
  getFeatureStyle,
  getCurrentFeatures,
  setCurrentFeatures,
};
