import {UserGroupEnum} from "./userGroupEnum";

export interface AccessibilityPropertiesInterface {
    name: string,
    value: boolean | string,
    message: string | null,
    userGroups: UserGroupEnum[]
}
