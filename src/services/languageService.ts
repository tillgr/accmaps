import * as string from '../../public/strings/lang.en.json';

/* translates all strings of index.html */
function translate(): void {
  /*Top navigation bar*/
  document.getElementById("navbarBrandText").innerHTML = "Accessible Maps mobile";
  document.getElementById("changeUserProfileBtn").innerHTML = "Change user Profile";
  document.getElementById("buildingSearchSubmit").innerHTML = "Search";
  document.getElementById("indoorSearchSubmit").innerHTML = "Search";

  /*legend*/
  document.getElementById("legendLabel").innerHTML = "Legend";

  /*settings modal*/
  document.getElementById("userProfileModalLabel").innerHTML = "Select User Profile";
  document.getElementById("profileQuickSwitchHeader").innerHTML = "Profiles quick switch";
  document.getElementById("settingsHeader").innerHTML = "Settings";

  /*visual settings*/
  document.getElementById("userFeatureModalLabel").innerHTML = "Select Features";
  document.getElementById("featureSelectionHeader").innerHTML = "Feature selection";
  document.getElementById("accessibleFeatureSelectionHeader").innerHTML = "Accessible feature selection";
  document.getElementById("closeButtonLabel").innerHTML = "Close";
  document.getElementById("saveFeatureSelection").innerHTML = "Save changes";

  /*feature selection*/
  document.getElementById("visualSettingsLabel").innerHTML = "Visual Settings";
  document.getElementById("colorBlindnessHeader").innerHTML = "Color blindness";
  document.getElementById("contrastSettingsHeader").innerHTML = "Contrast settings";
  document.getElementById("closeVisualSettings").innerHTML = "Close";
  document.getElementById("saveVisualSettings").innerHTML = "Save changes";
}

export default {
  translate,
};
