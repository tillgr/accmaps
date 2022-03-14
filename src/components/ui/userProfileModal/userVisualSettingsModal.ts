import { Modal } from "bootstrap";
import * as colorProfiles from "../../../data/colorProfiles.json";
import { capitalize } from "../../../utils/capitalize";
import userProfileModal from "./userProfileModal";

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
  selectedColorProfile: colorProfiles[0],
  colorProfiles: colorProfiles,
  contrastSettings: {
    environmentOpacity: 0.5,
    colorStrength: 0.5,
    lineThickness: 0.5,
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
  const range_div = document.createElement("div");
  range_div.innerHTML = `<label for="${name}" class="form-label">${capitalize(
    name
  )}</label><input type="range" class="form-range" id="${name}">`;
  return range_div;
}

function handleChange() {
  colorBlindnessList.innerHTML = "";
  renderColorBlindnessList();
}

function onSave() {
  //featureService.setCurrentFeatures(checkboxState);
  userProfileModal.hideAll();

  //TODO Save to local storage (full state)
}

function hide(): void {
  userVisualSettingsModal.hide();
}

export default {
  hide,
  render,
};
