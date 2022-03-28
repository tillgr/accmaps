import { UserGroupsEnum } from "../models/userGroupsEnum";

const profileKey = "userProfile";
const featureKey = "currentlySelectedFeatures";

function getCurrentProfile(): UserGroupsEnum {
  const profile = localStorage.getItem(profileKey)
    ? <UserGroupsEnum>parseInt(localStorage.getItem(profileKey))
    : UserGroupsEnum.noImpairments;

  return profile;
}

function setProfile(profile: UserGroupsEnum): void {
  localStorage.setItem(profileKey, profile.toString());
  localStorage.removeItem(featureKey);
  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

export default {
  getCurrentProfile,
  setProfile,
};
