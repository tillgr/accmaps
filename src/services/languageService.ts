import { LanguageSettingsEnum } from "../models/languageSettingsEnum";
import { LanguageSettings } from "../data/languageSettings";
//sprachdateien:
import * as string from "../../public/strings/lang.en.json";
import * as stringDe from "../../public/strings/lang.de.json";

const defaultLanguage = LanguageSettingsEnum.english;
const languageKey = "language";

function getCurrentLanguage(): LanguageSettingsEnum {
  const language =
    <LanguageSettingsEnum>parseInt(localStorage.getItem(languageKey)) ??
    defaultLanguage;
  return language;
}

/*function getLanguageResource(): string {
  const language = LanguageSettings.get(getCurrentLanguage())
  return language.resourceFile;
}*/

function setLanguage(language: LanguageSettingsEnum): void {
  localStorage.setItem(languageKey, language.toString());
  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

/* translates all strings of index.html */
/*function usedLanguage(): { [key: string]: string } {
  /!*in jeder Datei würden die Sprachdateien und eine Konstante (usedLanguage) definiert werden und damit
  die gewählte Sprache ausgewählt werden anschließend werden die
  gewünschten Strings über usedLanguage.[gesuchter string] abgefragt
  *!/
  const usedLanguage =
    getCurrentLanguage() == LanguageSettingsEnum.english ? string : stringDe;

  return usedLanguage;

  /!* /!*top navigation bar*!/
  document.getElementById("navbarBrandText").innerHTML =
    usedLanguage.navbarBrandText;
  document.getElementById("changeUserProfileBtn").innerHTML =
    usedLanguage.changeUserProfileBtn;
  document.getElementById("buildingSearchSubmit").innerHTML =
    usedLanguage.buildingSearchSubmit;
  document.getElementById("indoorSearchSubmit").innerHTML =
    usedLanguage.indoorSearchSubmit;

  /!*legend*!/
  document.getElementById("legendLabel").innerHTML = usedLanguage.legendLabel;

  /!*settings modal*!/
  document.getElementById("userProfileModalLabel").innerHTML =
    usedLanguage.userProfileModalLabel;
  document.getElementById("profileQuickSwitchHeader").innerHTML =
    usedLanguage.profileQuickSwitchHeader;
  document.getElementById("settingsHeader").innerHTML =
    usedLanguage.settingsHeader;

  /!*visual settings*!/
  document.getElementById("userFeatureModalLabel").innerHTML =
    usedLanguage.userFeatureModalLabel;
  document.getElementById("featureSelectionHeader").innerHTML =
    usedLanguage.featureSelectionHeader;
  document.getElementById("accessibleFeatureSelectionHeader").innerHTML =
    usedLanguage.accessibleFeatureSelectionHeader;
  document.getElementById("closeButtonLabel").innerHTML =
    usedLanguage.closeButtonLabel;
  document.getElementById("saveFeatureSelection").innerHTML =
    usedLanguage.saveFeatureSelection;

  /!*feature selection*!/
  document.getElementById("visualSettingsLabel").innerHTML =
    usedLanguage.visualSettingsLabel;
  document.getElementById("colorBlindnessHeader").innerHTML =
    usedLanguage.colorBlindnessHeader;
  document.getElementById("contrastSettingsHeader").innerHTML =
    usedLanguage.contrastSettingsHeader;
  document.getElementById("closeVisualSettings").innerHTML =
    usedLanguage.closeVisualSettings;
  document.getElementById("saveVisualSettings").innerHTML =
    usedLanguage.saveVisualSettings;*!/
}*/

export default {
  //getLanguageResource,
  getCurrentLanguage,
  setLanguage,
};

/*exported language json for the use in all components*/
export const lang =
  getCurrentLanguage() == LanguageSettingsEnum.english ? string : stringDe;
