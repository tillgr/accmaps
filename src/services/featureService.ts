import { GeoJSON, Icon, LatLng, Marker } from "leaflet";
import { featureDescriptionHelper } from "../utils/featureDescriptionHelper";
import { featureAccessibilityProperties } from "../data/featureAccessibilityProperties";
import UserService from "../services/userService";
import { lang } from "./languageService";
import {
  FILL_OPACITY,
  MARKERS_IMG_DIR,
  WALL_WEIGHT,
  WALL_WEIGHT_PAVING,
} from "../data/constants.json";
import { UserGroupEnum } from "../models/userGroupEnum";
import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserFeatureSelection } from "../data/userFeatureSelection";
import colorService, { colors } from "./colorService";

const polygonCenter = require("geojson-polygon-center");
const currentlySelectedFeatures: Map<any, boolean> = getCurrentFeatures();

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

  return lang.selectedMapObjectPrefix + popUpText;
}

function checkForMatchingTags(tags: UserFeatureEnum[]): boolean {
  const hasMatched = tags.some((t) => {
    return currentlySelectedFeatures.get(UserFeatureEnum[t]);
  });

  return hasMatched;
}

function getAccessibilityMarker(feature: GeoJSON.Feature): Marker {
  let iconFileName = "";

  const isFeatureAccessible = featureAccessibilityProperties.some(
    ({ hasCorrectProperties, iconFilename, userGroups, tags }) => {
      if (
        userGroups.includes(UserService.getCurrentProfile()) &&
        hasCorrectProperties(feature) &&
        iconFilename !== undefined &&
        checkForMatchingTags(tags)
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
    fill = colors.toiletColor;
  } else if (
    feature.properties.stairs ||
    (feature.properties.highway &&
      (feature.properties.highway == "elevator" ||
        feature.properties.highway == "escalator"))
  ) {
    fill = colors.stairsColor;
  } else if (feature.properties.indoor === "room") {
    fill = colors.roomColor;
  }

  return {
    fillColor: fill,
    weight: getWallWeight(feature) + colorService.getLineThickness() / 20,
    color: colors.wallColor,
    fillOpacity: FILL_OPACITY,
  };
}

function getWallWeight(feature: GeoJSON.Feature<any>) {
  //highlight tactile paving lines
  //decides wall weight based on the user profile and feature
  return UserService.getCurrentProfile() == UserGroupEnum.blindPeople &&
    feature.geometry.type === "LineString" &&
    feature.properties.tactile_paving === "yes"
    ? +WALL_WEIGHT_PAVING
    : +WALL_WEIGHT;
}

export function getCurrentFeatures(): Map<UserFeatureEnum, boolean> {
  const currentlySelectedFeatures: Map<UserFeatureEnum, boolean> =
    localStorage.getItem("currentlySelectedFeatures")
      ? new Map(JSON.parse(localStorage.currentlySelectedFeatures))
      : (() => {
          const defaultSelectedFeatures = new Map();
          for (const [k, v] of UserFeatureSelection.entries()) {
            defaultSelectedFeatures.set(v.id, v.isCheckedDefault);
          }
          return defaultSelectedFeatures;
        })();
  return currentlySelectedFeatures;
}

export function setCurrentFeatures(
  checkboxState: Map<UserFeatureEnum, boolean>
): void {
  localStorage.currentlySelectedFeatures = JSON.stringify([
    ...checkboxState.entries(),
  ]);
}

export default {
  getAccessibilityDescription,
  getAccessibilityMarker,
  getFeatureStyle,
  getCurrentFeatures,
  setCurrentFeatures,
};
