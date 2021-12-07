import { GeoJSON, Icon, LatLng, Marker } from "leaflet";
import { featureDescriptionHelper } from "./featureDescriptionHelper";
import { featureAccessibilityProperties } from "./data/featureAccessibilityProperties";
import { UserProfile } from "./userService";
import {
  COLORS,
  FILL_OPACITY,
  MARKERS_IMG_DIR,
  WALL_WEIGHT,
  WALL_WEIGHT_PAVING,
} from "./data/constants";
import { UserGroupEnum } from "../models/userGroupEnum";

const polygonCenter = require("geojson-polygon-center");

export function getAccessibilityDescription(feature: GeoJSON.Feature): string {
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

  return "Selected map object: " + popUpText;
}

export function getAccessibilityMarker(feature: GeoJSON.Feature): Marker {
  let iconFileName = "";

  const isFeatureAccessible = featureAccessibilityProperties.some(
    ({ accessibilityFunction, iconFilename, userGroups }) => {
      if (
        userGroups.includes(UserProfile.get()) &&
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

export function getFeatureStyle(feature: GeoJSON.Feature<any>): any {
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
  return UserProfile.get() == UserGroupEnum.blindPeople &&
    feature.geometry.type === "LineString" &&
    feature.properties.tactile_paving === "yes"
    ? WALL_WEIGHT_PAVING
    : WALL_WEIGHT;
}
