import {UserGroupEnum} from "../interfaces/userGroupEnum";

let selectedUserGroup: UserGroupEnum = <UserGroupEnum>parseInt(localStorage.getItem('userProfile')) ?? UserGroupEnum.noImpairments;

export const UserProfile = {
    get(): UserGroupEnum {
        return selectedUserGroup;
    },
    set(userGroup: UserGroupEnum): void {
        selectedUserGroup = userGroup;

        setTimeout(window.location.reload.bind(window.location), 200);
    }
}
