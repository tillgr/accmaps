import * as _default from "../../public/strings/colorProfiles/default.json";
import * as gray from "../../public/strings/colorProfiles/gray.json";
import * as red_green from "../../public/strings/colorProfiles/red_green.json";
import * as yellow_blue from "../../public/strings/colorProfiles/yellow_blue.json";

const profileKey = "colorProfile";

function getCurrentProfile(): string {
  return localStorage.getItem(profileKey) ?? "default";
}

function setProfile(profile: string): void {
  localStorage.setItem(profileKey, profile);
  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

function getCurrentColors() {
  const profile = getCurrentProfile();

  switch (profile) {
    case "default":
      return _default;
    case "gray":
      return gray;
    case "red_green":
      return red_green;
    case "yellow_blue":
      return yellow_blue;
  }
}

export default {
  getCurrentProfile,
  setProfile,
};

export const colors = getCurrentColors();
