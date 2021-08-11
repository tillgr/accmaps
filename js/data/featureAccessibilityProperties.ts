import {FeatureAccessibilityPropertiesInterface} from "../interfaces/featureAccessibilityPropertiesInterface";
import {UserGroup} from "./userGroup";

const allGroups = [UserGroup.blindPeople, UserGroup.noImpairments, UserGroup.wheelchairUsers];

export const featureAccessibilityProperties: FeatureAccessibilityPropertiesInterface[] = [
    {name: 'handrail', value: true, message: 'handrail available', userGroups: [UserGroup.blindPeople]},
    {name: 'tactile_paving', value: true, message: 'tactile paving available', userGroups: [UserGroup.blindPeople]},
    {name: 'amenity', value: 'toilets', message: 'toilet', userGroups: allGroups},
    {name: 'male', value: true, message: 'male', userGroups: allGroups},
    {name: 'female', value: true, message: 'female', userGroups: allGroups},
    {name: 'wheelchair', value: 'no', message: 'no wheelchair access', userGroups: [UserGroup.wheelchairUsers]},
    {name: 'wheelchair', value: 'yes', message: 'wheelchair access possible', userGroups: [UserGroup.wheelchairUsers]},
    {name: 'wheelchair:description:en', value: true, message: null, userGroups: [UserGroup.wheelchairUsers]},
    {name: 'wheelchair:description:de', value: true, message: null, userGroups: [UserGroup.wheelchairUsers]},
    {name: 'speech_output:de', value: true, message: 'speech output (German)', userGroups: [UserGroup.blindPeople]},
    {name: 'speech_output:en', value: true, message: 'speech output (English)', userGroups: [UserGroup.blindPeople]},
];
