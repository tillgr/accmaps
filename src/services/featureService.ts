import { GeoJSON, Icon, LatLng, Marker } from "leaflet";
import { featureDescriptionHelper } from "./featureDescriptionHelper";
import { featureAccessibilityProperties } from "./data/featureAccessibilityProperties";
import { UserProfile } from "./userService";
import { MARKERS_IMG_DIR } from "./data/constants";

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
