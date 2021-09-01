import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

const allGroups = [UserGroupEnum.blindPeople, UserGroupEnum.noImpairments, UserGroupEnum.wheelchairUsers];

export const featureAccessibilityProperties: AccessibilityPropertiesInterface[] = [
    {name: 'handrail', value: true, message: 'handrail available', userGroups: [UserGroupEnum.blindPeople]},
    {name: 'tactile_paving', value: true, message: 'tactile paving available', userGroups: [UserGroupEnum.blindPeople]},
    {name: 'amenity', value: 'toilets', message: 'toilet', userGroups: allGroups},
    {name: 'male', value: true, message: 'male', userGroups: allGroups},
    {name: 'female', value: true, message: 'female', userGroups: allGroups},
    {name: 'wheelchair', value: 'no', message: 'no wheelchair access', userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'wheelchair', value: 'yes', message: 'wheelchair access possible', userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'wheelchair:description:en', value: true, message: null, userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'wheelchair:description:de', value: true, message: null, userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'speech_output:de', value: true, message: 'speech output (German)', userGroups: [UserGroupEnum.blindPeople]},
    {name: 'speech_output:en', value: true, message: 'speech output (English)', userGroups: [UserGroupEnum.blindPeople]},
];
