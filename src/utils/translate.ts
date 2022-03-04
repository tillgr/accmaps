import { lang } from "../services/languageService";

/* used to translate strings in the index.html */
export function translate(): void {
  document.getElementById("navbarBrandText").innerText = lang.navbarBrandText;
  document.getElementById("changeUserProfileBtnLabel").innerText = lang.changeUserProfileBtn;
  document.getElementById("userProfileModalLabel").innerText = lang.userProfileModalLabel;
  document.getElementById("profileQuickSwitchHeader").innerText = lang.profileQuickSwitchHeader;
  document.getElementById("settingsHeader").innerText = lang.settingsHeader;
  document.getElementById("languageHeader").innerText = lang.profileQuickSwitchHeader;

  document.getElementById("buildingSearchInput")
    .setAttribute("aria-label", lang.closeButtonLabel);
  document.getElementById("centeringButton")
    .setAttribute("aria-label", lang.centeringButton);
}
