import {UserGroupEnum} from "../interfaces/userGroupEnum";

let selectedUserGroup: UserGroupEnum = <UserGroupEnum>parseInt(localStorage.getItem('userProfile')) ?? UserGroupEnum.noImpairments;

export const UserProfile = {
    get() {
        return selectedUserGroup;
    },
    set(userGroup: UserGroupEnum) {
        selectedUserGroup = userGroup;
    }
}
