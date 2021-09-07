import {GeoJSON} from "leaflet";
import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserProfile} from "../userProfile";

export function featureDescription(feature: GeoJSON.Feature, accessibilityProperties: AccessibilityPropertiesInterface[]) {
    let description = '';

    accessibilityProperties.forEach((e: AccessibilityPropertiesInterface) => {
        if (!e.userGroups.includes(UserProfile.get())) {
            return; // only show properties for currently selected user profile
        }

        if (feature.properties[e.name] !== undefined &&
            (e.value === true || feature.properties[e.name] === e.value)) {
            description += ', ' + (e.message ? e.message : feature.properties[e.name]);
        }
    });

    return description;
}
