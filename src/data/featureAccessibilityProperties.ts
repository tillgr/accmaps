import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

const allGroups = [UserGroupEnum.blindPeople, UserGroupEnum.noImpairments, UserGroupEnum.wheelchairUsers];

export const featureAccessibilityProperties: AccessibilityPropertiesInterface[] = [
    {
        accessibilityFunction: (f) => (f.properties.handrail !== undefined),
        msgTrue: 'handrail available',
        msgFalse: 'no handrail available',
        userGroups: [UserGroupEnum.blindPeople],
        iconFilename: 'handrail.png'
    },
    {
        accessibilityFunction: (f) => (f.properties.tactile_paving !== undefined),
        msgTrue: 'tactile paving available',
        msgFalse: 'no tactile paving available',
        userGroups: [UserGroupEnum.blindPeople],
        iconFilename: 'tactile_paving.png'
    },
    {
        accessibilityFunction: (f) => (f.properties.amenity !== undefined && f.properties.amenity == 'toilets'),
        msgTrue: (f) => ((f.properties.male !== undefined) ? 'male ' : (f.properties.female !== undefined) ? 'female ' : 'unisex ') + 'toilet',
        msgFalse: null,
        userGroups: allGroups
    },
    {
        accessibilityFunction: (f) => (f.properties.wheelchair !== undefined && f.properties.wheelchair == 'yes'),
        msgTrue: 'wheelchair access possible',
        msgFalse: 'no wheelchair access',
        userGroups: [UserGroupEnum.wheelchairUsers],
        iconFilename: 'wheelchair.png'
    },
    {
        accessibilityFunction: (f) => (f.properties['wheelchair:description:en'] !== undefined),
        msgTrue: (f) => f.properties['wheelchair:description:en'],
        msgFalse: null,
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) => (f.properties['wheelchair:description:de'] !== undefined),
        msgTrue: (f) => f.properties['wheelchair:description:de'],
        msgFalse: null,
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) => f.properties['speech_output:de'] !== undefined || f.properties['speech_output:en'] !== undefined || f.properties['speech_output'] !== undefined,
        msgTrue: 'speech output available',
        msgFalse: null,
        userGroups: [UserGroupEnum.blindPeople]
    },
];
