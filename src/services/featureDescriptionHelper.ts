import {GeoJSON} from "leaflet";
import {AccessibilityPropertiesInterface} from "../models/accessibilityPropertiesInterface";
import {UserProfile} from "./userProfile";

export function featureDescriptionHelper(feature: GeoJSON.Feature, accessibilityProperties: AccessibilityPropertiesInterface[]): string {
    let description = ' [';

    accessibilityProperties.forEach((e: AccessibilityPropertiesInterface) => {
        if (!e.userGroups.includes(UserProfile.get())) {
            return; // only show properties for currently selected user profile
        }

        if (e.accessibilityFunction(feature)) {
            description += ((typeof e.msgTrue === 'string') ? e.msgTrue : e.msgTrue(feature)) + ', ';
        } else if (e.msgFalse !== null && (typeof e.msgFalse === 'string')) {
            description += e.msgFalse + ', ';
        } else if (e.msgFalse !== null && (typeof e.msgFalse === 'function')) {
            if (e.msgFalse(feature)) {
                description += e.msgFalse(feature) + ', ';
            }
        }
    });

    if (description.length > 2) {
        description = description.slice(0, -2) + ']';
    } else {
        description = '';
    }

    return description;
}
