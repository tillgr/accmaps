import {AccessibilityPropertiesInterface} from "../interfaces/accessibilityPropertiesInterface";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

const allGroups = [UserGroupEnum.blindPeople, UserGroupEnum.noImpairments, UserGroupEnum.wheelchairUsers];

export const buildingAccessibilityProperties: AccessibilityPropertiesInterface[] = [
    {name: 'wheelchair', value: 'no', message: 'no wheelchair access', userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'wheelchair', value: 'yes', message: 'wheelchair access possible', userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'toilets:wheelchair', value: 'yes', message: 'accessible toilets available', userGroups: [UserGroupEnum.wheelchairUsers]},
    {name: 'opening_hours', value: true, message: null, userGroups: allGroups}
];
