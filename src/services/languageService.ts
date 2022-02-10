import { LanguageSettingsEnum } from "../models/languageSettingsEnum";
import { LanguageSettings } from "../data/languageSettings";
import * as string from '../../public/strings/lang.en.json';

const defaultLanguage = LanguageSettingsEnum.english;
const languageKey = "language";

function getCurrentLanguage(): LanguageSettingsEnum {
  const language = <LanguageSettingsEnum>parseInt(localStorage.getItem(languageKey)) ?? defaultLanguage;
  return language;
}

function getLanguageResource(): string {
  const language = LanguageSettings.get(getCurrentLanguage())
  return language.resourceFile;
}

function setLanguage(language: LanguageSettingsEnum): void {
  localStorage.setItem(languageKey, language.toString());
  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

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
  getCurrentLanguage,
  getLanguageResource,
  setLanguage,
  translate,
};
