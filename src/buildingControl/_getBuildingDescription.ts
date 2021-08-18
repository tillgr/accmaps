import {GeoJSON} from "leaflet";

export function getBuildingDescription(currentBuildingFeature: GeoJSON.Feature): string {
    let description = ""

    if (currentBuildingFeature.properties.name !== undefined) {
        description += "Current building: " + currentBuildingFeature.properties.name;
        if (currentBuildingFeature.properties.loc_ref !== undefined) {
            description += " (" + currentBuildingFeature.properties.loc_ref + ")";

        }
    }

    if (currentBuildingFeature.properties.wheelchair !== undefined) {
        description += (currentBuildingFeature.properties.wheelchair == "yes") ? ", accessible by wheelchair" : ", not accessible by wheelchair";
    }

    if (currentBuildingFeature.properties.opening_hours !== undefined) {
        description += ", opening hours: " + currentBuildingFeature.properties.opening_hours;
    }

    //todo: ...

    return description;
}
