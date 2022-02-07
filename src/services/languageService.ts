import * as string from '../../public/strings/lang.en.json';

/* translates all strings of index.html */
function translate(): void {
  /*top navigation bar*/
  document.getElementById("navbarBrandText").innerHTML = string.navbarBrandText;
  document.getElementById("changeUserProfileBtn").innerHTML = string.changeUserProfileBtn;
  document.getElementById("buildingSearchSubmit").innerHTML = string.buildingSearchSubmit;
  document.getElementById("indoorSearchSubmit").innerHTML = string.indoorSearchSubmit;

  /*legend*/
  document.getElementById("legendLabel").innerHTML = string.legendLabel;

  /*settings modal*/
  document.getElementById("userProfileModalLabel").innerHTML = string.userProfileModalLabel;
  document.getElementById("profileQuickSwitchHeader").innerHTML = string.profileQuickSwitchHeader;
  document.getElementById("settingsHeader").innerHTML = string.settingsHeader;

  /*visual settings*/
  document.getElementById("userFeatureModalLabel").innerHTML = string.userFeatureModalLabel;
  document.getElementById("featureSelectionHeader").innerHTML = string.featureSelectionHeader;
  document.getElementById("accessibleFeatureSelectionHeader").innerHTML = string.accessibleFeatureSelectionHeader;
  document.getElementById("closeButtonLabel").innerHTML = string.closeButtonLabel;
  document.getElementById("saveFeatureSelection").innerHTML = string.saveFeatureSelection;

  /*feature selection*/
  document.getElementById("visualSettingsLabel").innerHTML = string.visualSettingsLabel;
  document.getElementById("colorBlindnessHeader").innerHTML = string.colorBlindnessHeader;
  document.getElementById("contrastSettingsHeader").innerHTML = string.contrastSettingsHeader;
  document.getElementById("closeVisualSettings").innerHTML = string.closeVisualSettings;
  document.getElementById("saveVisualSettings").innerHTML = string.saveVisualSettings;
}

export default {
  translate,
};
