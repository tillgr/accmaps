import { UserGroupEnum } from "../models/userGroupEnum";

let currentProfile: UserGroupEnum =
  <UserGroupEnum>parseInt(localStorage.getItem("userService")) ??
  UserGroupEnum.noImpairments;

export const UserService = {
  getCurrentProfile(): UserGroupEnum {
    return currentProfile;
  },
  set(profile: UserGroupEnum): void {
    currentProfile = profile;
    /*
     * Hack: reload window location to properly update all profile-specific information.
     * Relevant data is stored in localStorage and remains persistent after reload.
     */
    setTimeout(window.location.reload.bind(window.location), 200);
  },
};

//TODO create export default object
