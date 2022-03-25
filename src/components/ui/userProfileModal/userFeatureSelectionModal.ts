import { Modal } from "bootstrap";
import { UserFeatureEnum } from "../../../models/userFeatureEnum";
import featureService from "../../../services/featureService";
import { UserFeatureSelection } from "../../../data/userFeatureSelection";
import userProfileModal from "./userProfileModal";

const userFeatureSelectionModal = new Modal(
  document.getElementById("userFeatureSelectionModal"),
  { backdrop: "static", keyboard: false }
);

const checkboxState: Map<UserFeatureEnum, boolean> =
  featureService.getCurrentFeatures();

function render(): void {
  //create checkboxes and headings
  UserFeatureSelection.forEach((v, k) => {
    if (v.accessibleFeature) {
      document
        .getElementById("userAccessibleFeatureList")
        .append(renderCheckbox(v, k));
    } else {
      document.getElementById("userFeatureList").append(renderCheckbox(v, k));
    }
  });

  const saveFeaturesButton = document.getElementById("saveFeatureSelection");
  saveFeaturesButton.onclick = () => onSave();
}

function renderCheckbox(v: any, k: any): HTMLDivElement {
  const checkbox_div = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  checkbox_div.className = "form-check";

  checkbox.className = "form-check-input";
  checkbox.type = "checkbox";
  checkbox.id = v.id;

  checkbox.checked = checkboxState.get(v.id);
  checkbox.onchange = () => {
    checkboxState.set(v.id, checkbox.checked);
  };

  label.className = "form-check-label";
  label.htmlFor = v.id;
  label.innerText = v.name;

  checkbox_div.appendChild(checkbox);
  checkbox_div.appendChild(label);

  return checkbox_div;
}

function hide(): void {
  userFeatureSelectionModal.hide();
}

function onSave(): void {
  featureService.setCurrentFeatures(checkboxState);
  userProfileModal.hideAll();

  /*
   * Hack: reload window location to properly update all profile-specific information.
   * Relevant data is stored in localStorage and remains persistent after reload.
   */
  setTimeout(window.location.reload.bind(window.location), 200);
}

export default {
  hide,
  render,
  checkboxState,
};
