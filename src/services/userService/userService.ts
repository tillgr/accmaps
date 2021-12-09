import { UserGroupEnum } from "../../models/userGroupEnum";

let selectedUserGroup: UserGroupEnum =
  <UserGroupEnum>parseInt(localStorage.getItem("userService")) ??
  UserGroupEnum.noImpairments;

export const UserService = {
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
  },
};
