import { UserGroupEnum } from "../models/userGroupEnum";
import { UserFeatureSelection } from "../data/userFeatureSelection";
import SelectedFeatureService from "../services/selectedFeaturesService";

let currentProfile: UserGroupEnum =
  <UserGroupEnum>parseInt(localStorage.getItem("userService")) ??
  UserGroupEnum.noImpairments;

function getCurrentProfile(): UserGroupEnum {
  return currentProfile;
}

function set(profile: UserGroupEnum): void {
  currentProfile = profile;
  const currentSelected = UserFeatureSelection;

  UserFeatureSelection.forEach(function (feature, key) {
    if (feature.userGroups.includes(profile)) {
      currentSelected.set(key, true)
    } else {
      currentSelected.set(key, false)
    }
  });

  SelectedFeatureService.set(currentSelected);

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
