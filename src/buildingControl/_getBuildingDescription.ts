import {GeoJSON} from "leaflet";
import {buildingAccessibilityProperties} from "../data/buildingAccessibilityProperties";
import {featureDescription} from "../featureDescription";

export function getBuildingDescription(currentBuildingFeature: GeoJSON.Feature): string {
    let description = ""

    if (currentBuildingFeature.properties.name !== undefined) {
        description += "Current building: " + currentBuildingFeature.properties.name;
        if (currentBuildingFeature.properties.loc_ref !== undefined) {
            description += " (" + currentBuildingFeature.properties.loc_ref + ")";

        }
    }

    description += featureDescription(currentBuildingFeature, buildingAccessibilityProperties);

    return description;
}
