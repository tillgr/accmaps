import {UserGroupEnum} from "../interfaces/userGroupEnum";
import {LevelAccessibilityInformation} from "../levelControl/_levelAccessibilityInformation";

let selectedUserGroup: UserGroupEnum = <UserGroupEnum>parseInt(localStorage.getItem('userProfile')) ?? UserGroupEnum.noImpairments;

export const UserProfile = {
    get() {
        return selectedUserGroup;
    },
    set(userGroup: UserGroupEnum) {
        selectedUserGroup = userGroup;
        LevelAccessibilityInformation.reset();
    }
}
