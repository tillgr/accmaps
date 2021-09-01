import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserGroup} from "./userGroup";

const allGroups = [UserGroup.blindPeople, UserGroup.noImpairments, UserGroup.wheelchairUsers];

export const buildingAccessibilityProperties: AccessibilityPropertiesInterface[] = [
    {name: 'wheelchair', value: 'no', message: 'no wheelchair access', userGroups: [UserGroup.wheelchairUsers]},
    {name: 'wheelchair', value: 'yes', message: 'wheelchair access possible', userGroups: [UserGroup.wheelchairUsers]},
    {name: 'toilets:wheelchair', value: 'yes', message: 'accessible toilets available', userGroups: [UserGroup.wheelchairUsers]},
    {name: 'opening_hours', value: true, message: null, userGroups: allGroups}
];
