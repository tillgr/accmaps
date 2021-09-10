import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

const allGroups = [UserGroupEnum.blindPeople, UserGroupEnum.noImpairments, UserGroupEnum.wheelchairUsers];

export const buildingAccessibilityProperties: AccessibilityPropertiesInterface[] = [
    {
        accessibilityFunction: (f) => (f.properties.wheelchair !== undefined && f.properties.wheelchair === 'yes'),
        msgTrue: 'wheelchair access possible',
        msgFalse: (f) => (f.properties.wheelchair !== undefined) ? '' : 'no wheelchair access possible',
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) => (f.properties['wheelchair:description'] !== undefined),
        msgTrue: (f) => f.properties['wheelchair:description'],
        msgFalse: null,
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) => (f.properties['toilets:wheelchair'] !== undefined && f.properties['toilets:wheelchair'] === 'yes'),
        msgTrue: 'accessible toilets available',
        msgFalse: null,
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) => (f.properties['opening_hours'] !== undefined),
        msgTrue: (f) => f.properties['opening_hours'],
        msgFalse: null,
        userGroups: allGroups
    }
];
