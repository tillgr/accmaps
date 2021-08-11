import {UserGroup} from "../data/userGroup";

export interface FeatureAccessibilityPropertiesInterface {
    name: string,
    value: boolean | string,
    message: string | null,
    userGroups: UserGroup[]
}
