import {GeoJSON} from "leaflet";
import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserProfile} from "../userProfile";

export function featureDescription(feature: GeoJSON.Feature, accessibilityProperties: AccessibilityPropertiesInterface[]) {
    let description = ' [';

    accessibilityProperties.forEach((e: AccessibilityPropertiesInterface) => {
        if (!e.userGroups.includes(UserProfile.get())) {
            return; // only show properties for currently selected user profile
        }
        if (e.accessibilityFunction(feature)) {
            description += ((typeof e.msgTrue === 'string') ? e.msgTrue : e.msgTrue(feature)) + ', ';
        } else if (e.msgFalse !== null) {
            description += ((typeof e.msgFalse === 'string') ? e.msgFalse : e.msgFalse(feature)) + ', ';
        }
    });

    description = description.slice(0, -2) + ']';

    return description;
}
