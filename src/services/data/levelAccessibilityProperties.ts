import {UserGroupEnum} from "../../interfaces/userGroupEnum";
import {AccessibilityPropertiesInterface} from "../../interfaces/accessibilityPropertiesInterface";

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
        msgFalse: 'no accessible elevator available',
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (f) =>
            ['de', 'en'].some((lng) =>
                ((f.properties.tactile_writing !== undefined && f.properties.tactile_writing === 'yes') ||
                    (f.properties['tactile_writing:embossed_printed_letters:' + lng] !== undefined && f.properties['tactile_writing:embossed_printed_letters:' + lng] === 'yes') ||
                    (f.properties['tactile_writing:engraved_printed_letters:' + lng] !== undefined && f.properties['tactile_writing:engraved_printed_letters:' + lng] === 'yes') ||
                    (f.properties['tactile_writing:braille:' + lng] !== undefined && f.properties['tactile_writing:braille:' + lng] === 'yes') ||
                    (f.properties['tactile_writing:computer_braille:' + lng] !== undefined && f.properties['tactile_writing:computer_braille:' + lng] === 'yes') ||
                    (f.properties['tactile_writing:fakoo:' + lng] !== undefined && f.properties['tactile_writing:fakoo:' + lng] === 'yes') ||
                    (f.properties['tactile_writing:moon:' + lng] !== undefined && f.properties['tactile_writing:moon:' + lng] === 'yes'))
            ),
        msgTrue: 'there are objects with tactile writing on them',
        msgFalse: 'there are no objects with tactile writing on them',
        userGroups: [UserGroupEnum.blindPeople]
    },
    {
        accessibilityFunction: (f) => ((f.properties.highway !== undefined && f.properties.highway === 'elevator') &&
            ((f.properties['speech_output:en'] !== undefined && f.properties['speech_output:en'] === 'yes') ||
                (f.properties['speech_output:de'] !== undefined && f.properties['speech_output:de'] === 'yes'))),
        msgTrue: 'there are elevators with speech output',
        msgFalse: 'there are no elevators with speech output',
        userGroups: [UserGroupEnum.blindPeople]
    }
];
