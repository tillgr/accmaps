import {UserGroupEnum} from "../interfaces/userGroupEnum";
import {LevelAccessibilityInformation} from "../levelControl/_levelAccessibilityInformation";

let selectedUserGroup: UserGroupEnum = <UserGroupEnum>parseInt(localStorage.getItem('userProfile')) ?? UserGroupEnum.noImpairments;

export const UserProfile = {
    get(): UserGroupEnum {
        return selectedUserGroup;
    },
    set(userGroup: UserGroupEnum): void {
        selectedUserGroup = userGroup;
        LevelAccessibilityInformation.reset();
    }
}
