import { AccessibilityPropertiesInterface } from "../models/accessibilityPropertiesInterface";
import { UserGroupEnum } from "../models/userGroupEnum";

const allGroups = [
  UserGroupEnum.blindPeople,
  UserGroupEnum.noImpairments,
  UserGroupEnum.wheelchairUsers,
];

/**
 * List of all possible accessibility features, which can be shown on click or by indication icons.
 * Currently, only the very FIRST hit in this list is shown.
 * So the most specific properties should be listed first, afterwards the more general ones.
 */
export const featureAccessibilityProperties: AccessibilityPropertiesInterface[] = [

    /* ================ blind people ================ */
    /* tactile information board / tactile map */
    {
        accessibilityFunction: (f) => ((f.properties.information !== undefined && ['tactile_map', 'tactile_model', 'braille', 'tactile_letters'].includes(f.properties.information))),
        msgTrue: 'tactile information board / tactile map',
        msgFalse: null,
        userGroups: [UserGroupEnum.blindPeople],
        iconFilename: 'information.svg'
    },
    {
        accessibilityFunction: (f) => f.properties['speech_output:de'] !== undefined || f.properties['speech_output:en'] !== undefined || f.properties['speech_output'] !== undefined,
        msgTrue: 'speech output available',
        msgFalse: null,
        userGroups: [UserGroupEnum.blindPeople]
    },

    /* ================ wheelchair users ================ */
    {
        accessibilityFunction: (f) => (f.properties.amenity !== undefined && f.properties.amenity === 'toilets' && f.properties.wheelchair !== undefined && ['yes', 'designated'].includes(f.properties.wheelchair)),
        msgTrue: 'accessible toilet',
        msgFalse: null,
        userGroups: [UserGroupEnum.wheelchairUsers],
        iconFilename: 'toilets_wheelchair.svg'
    },
    {
        accessibilityFunction: (f) => (f.properties.highway !== undefined && f.properties.highway === 'elevator' && f.properties.wheelchair !== undefined && ['yes', 'designated'].includes(f.properties.wheelchair)),
        msgTrue: 'elevator',
        msgFalse: null,
        userGroups: [UserGroupEnum.wheelchairUsers],
        iconFilename: 'elevator2_freepik.svg'
    },
    {
        accessibilityFunction: (f) => (f.properties.wheelchair !== undefined && ['yes', 'designated'].includes(f.properties.wheelchair)),
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

    /* ================ general features ================ */
    /* toilets - general (no wheelchair) */
    {
        accessibilityFunction: (f) => (f.properties.amenity !== undefined && f.properties.amenity === 'toilets' && (f.properties.wheelchair === undefined || !['yes', 'designated'].includes(f.properties.wheelchair))),
        msgTrue: (f) => ((f.properties.male !== undefined) ? 'male ' : (f.properties.female !== undefined) ? 'female ' : 'unisex ') + 'toilet',
        msgFalse: null,
        userGroups: [UserGroupEnum.noImpairments, UserGroupEnum.blindPeople],
        iconFilename: 'toilets.svg'
    },
    /* entrances (general) */
    {
        accessibilityFunction: (f) => (f.properties.entrance !== undefined && ['yes', 'main', 'secondary'].includes(f.properties.entrance)),
        msgTrue: (f) => ((f.properties.entrance === 'main') ? 'main ' : (f.properties.entrance === 'secondary') ? 'secondary ' : '') + 'entrance',
        msgFalse: null,
        userGroups: allGroups,
        iconFilename: 'entrance.svg'
    },
    /* emergency exist (general) */
    {
        accessibilityFunction: (f) => ((f.properties.exit !== undefined && ['yes', 'emergency'].includes(f.properties.exit)) ||
            (f.properties.entrance !== undefined && ['exit', 'emergency'].includes(f.properties.entrance))),
        msgTrue: 'exit',
        msgFalse: null,
        userGroups: allGroups,
        iconFilename: 'emergency_exit.svg'
    },
    /* information boards (general, except blind people) */
    {
        accessibilityFunction: (f) => ((f.properties.information !== undefined && ['board', 'map'].includes(f.properties.information))),
        msgTrue: 'information board / map',
        msgFalse: null,
        userGroups: [UserGroupEnum.noImpairments, UserGroupEnum.wheelchairUsers],
        iconFilename: 'information.svg'
    },

    /* stairs (general, except wheelchair users) */
    {
        accessibilityFunction: (f) => ((f.properties.highway !== undefined && f.properties.highway === 'steps') || (f.properties.stairs !== undefined && f.properties.stairs === 'yes')),
        msgTrue: 'stairs',
        msgFalse: null,
        userGroups: [UserGroupEnum.noImpairments, UserGroupEnum.blindPeople],
        iconFilename: 'stairs.svg'
    },
];
