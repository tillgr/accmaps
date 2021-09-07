import {UserGroupEnum} from "./userGroupEnum";

export interface AccessibilityPropertiesInterface {
    name: string,
    value: boolean | string,
    message: string | false, // false, if the value (given by name) should be used
    userGroups: UserGroupEnum[]
}
