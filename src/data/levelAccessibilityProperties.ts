import {UserGroupEnum} from "../interfaces/userGroupEnum";
import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";

export const levelAccessibilityProperties: AccessibilityPropertiesInterface[] = [
    {
        accessibilityFunction: (f) =>
            (f.properties.amenity !== undefined && f.properties.amenity === 'toilets'
                && f.properties.wheelchair !== undefined && f.properties.wheelchair !== 'no'),
        msgTrue: 'there are accessible toilets',
        msgFalse: 'no accessible toilets available',
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) =>
            (f.properties.tactile_paving !== undefined && f.properties.tactile_paving === 'yes'),
        msgTrue: 'tactile paving available',
        msgFalse: 'no tactile paving available',
        userGroups: [UserGroupEnum.blindPeople]
    },
    {
        accessibilityFunction: (f) =>
            (f.properties.highway !== undefined && f.properties.highway === 'elevator' &&
                f.properties.wheelchair !== undefined && f.properties.wheelchair !== 'no'),
        msgTrue: 'accessible elevator available',
        msgFalse: 'accessible elevator available',
        userGroups: [UserGroupEnum.wheelchairUsers]
    }
];
