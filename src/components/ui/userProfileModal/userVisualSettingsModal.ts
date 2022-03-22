import { Modal } from "bootstrap";
import { colorProfiles } from "../../../data/colorProfiles";
import { capitalize } from "../../../utils/capitalize";
import userProfileModal from "./userProfileModal";
import colorService from "../../../services/colorService";

const userVisualSettingsModal = new Modal(
  document.getElementById("userVisualSettingsModal"),
  { backdrop: "static", keyboard: false }
);

const colorBlindnessList = document.getElementById("colorBlindnessList");
const contrastSettingsList = document.getElementById("contrastSettingsList");

const state: {
  selectedColorProfile: string;
  colorProfiles: string[];
  contrastSettings: {
    environmentOpacity: number;
    colorStrength: number;
    lineThickness: number;
  };
} = {
  selectedColorProfile: colorService.getCurrentProfile(),
  colorProfiles: colorProfiles,
  contrastSettings: {
    environmentOpacity: colorService.getEnvOpacity(),
    colorStrength: colorService.getColorStrength(),
    lineThickness: colorService.getLineThickness(),
  },
};

function render(): void {
  renderColorBlindnessList();
  renderContrastSettingsList();

  const saveFeaturesButton = document.getElementById("saveVisualSettings");
  saveFeaturesButton.onclick = () => onSave();
}
function renderColorBlindnessList(): void {
  const { colorProfiles: profiles } = state;

  profiles.map((p) => {
    document.getElementById("colorBlindnessList").append(renderCheckbox(p));
  });
}

function renderCheckbox(profile: string): HTMLDivElement {
  const checkbox_div = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  const { selectedColorProfile } = state;

  checkbox_div.className = "form-check";
  checkbox.className = "form-check-input";
  checkbox.type = "checkbox";
  checkbox.id = profile;

  checkbox.checked = profile === selectedColorProfile;

  checkbox.onchange = (e: Event) => {
    state.selectedColorProfile = (<HTMLElement>e.currentTarget).id;

    handleChange();
  };

  label.className = "form-check-label";
  label.htmlFor = profile;
  label.innerText = profile;

  checkbox_div.appendChild(checkbox);
  checkbox_div.appendChild(label);

  return checkbox_div;
}

function renderContrastSettingsList(): void {
  const { contrastSettings } = state;

  Object.keys(contrastSettings).map((s) => {
    contrastSettingsList.append(renderRangeInput(s));
  });
}

function renderRangeInput(name: string): HTMLDivElement {
  type prop = keyof typeof state.contrastSettings;
  const range_div = document.createElement("div");
  range_div.innerHTML = `<label for="${name}" class="form-label">${capitalize(
    name
  )}</label><input type="range" class="form-range" id="${name}" step="10" min="0" max="100" value="${
    state.contrastSettings[name as prop]
  }">`;

  range_div.onchange = (e: Event) => {
    type prop = keyof typeof state.contrastSettings;
    const prop = (<HTMLElement>e.target).id;

    state.contrastSettings[prop as prop] = +(<HTMLInputElement>e.target).value;
  };
  return range_div;
}

function handleChange() {
  colorBlindnessList.innerHTML = "";
  renderColorBlindnessList();
}

function onSave() {
  //featureService.setCurrentFeatures(checkboxState);
  userProfileModal.hideAll();

  colorService.setCurrentProfile(state.selectedColorProfile);
  colorService.setEnvOpacity(state.contrastSettings.environmentOpacity);
  colorService.setColorStrength(state.contrastSettings.colorStrength);
  colorService.setLineThickness(state.contrastSettings.lineThickness);

  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

function hide(): void {
  userVisualSettingsModal.hide();
}

export default {
  hide,
  render,
};
