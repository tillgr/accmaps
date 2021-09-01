import {UserGroupEnum} from "../interfaces/userGroupEnum";

let selectedUserGroup: UserGroupEnum = UserGroupEnum.noImpairments;

export const UserProfile = {
    get() {
        return selectedUserGroup;
    },
    set(userGroup: UserGroupEnum) {
        selectedUserGroup = userGroup;
    }
}
