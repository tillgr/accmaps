const profileKey = "colorProfile";

function getCurrentProfile(): string {
  const profile = localStorage.getItem(profileKey) ?? "default";

  return profile;
}

function setProfile(profile: string): void {
  localStorage.setItem(profileKey, profile.toString());
  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

function getCurrentColors(): any {
  return null;
}

export default {
  getCurrentProfile,
  setProfile,
};

export const colors = getCurrentColors();
