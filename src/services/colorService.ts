import * as _default from "../../public/strings/colorProfiles/default.json";
import * as black_white from "../../public/strings/colorProfiles/black_white.json";
import * as red_green from "../../public/strings/colorProfiles/red_green.json";
import * as blue_yellow from "../../public/strings/colorProfiles/blue_yellow.json";

const profileKey = "colorProfile";

function getCurrentProfile(): string {
  return localStorage.getItem(profileKey) ?? "none";
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
    case "none":
      return _default;
    case "black_white":
      return black_white;
    case "red_green":
      return red_green;
    case "blue_yellow":
      return blue_yellow;
  }
}

export default {
  getCurrentProfile,
  setProfile,
};

export const colors = getCurrentColors();
