import {UserGroup} from "../data/userGroup";

let selectedUserGroup: UserGroup = UserGroup.noImpairments;


export const UserProfile = {
    get() {
        return selectedUserGroup;
    },
    set(userGroup: UserGroup) {
        selectedUserGroup = userGroup;
    }
}
