import { UserGroupEnum } from "../models/userGroupEnum";

const profileKey = "userProfile";

function getCurrentProfile(): UserGroupEnum {
  const profile =
    <UserGroupEnum>parseInt(localStorage.getItem(profileKey)) ??
    UserGroupEnum.noImpairments;

  return profile;
}

function set(profile: UserGroupEnum): void {
  localStorage.setItem(profileKey, profile.toString());
  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

export default {
  getCurrentProfile,
  set,
};
