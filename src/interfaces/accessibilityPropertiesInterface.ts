import {UserGroup} from "../data/userGroup";

export interface AccessibilityPropertiesInterface {
    name: string,
    value: boolean | string,
    message: string | null,
    userGroups: UserGroup[]
}
