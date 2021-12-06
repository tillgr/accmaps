import {UserGroupEnum} from "../../interfaces/userGroupEnum";

let selectedUserGroup: UserGroupEnum = <UserGroupEnum>parseInt(localStorage.getItem('userProfile')) ?? UserGroupEnum.noImpairments;

export const UserProfile = {
    get(): UserGroupEnum {
        return selectedUserGroup;
    },
    set(userGroup: UserGroupEnum): void {
        selectedUserGroup = userGroup;
        /*
         * Hack: reload window location to properly update all profile-specific information.
         * Relevant data is stored in localStorage and remains persistent after reload.
         */
        setTimeout(window.location.reload.bind(window.location), 200);
    }
}
