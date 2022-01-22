import { Modal } from "bootstrap";
import { UserFeatureEnum } from "../../../models/userFeatureEnum";
import SelectedFeatureService from "../../../services/selectedFeaturesService";
import { UserFeatureSelection } from "../../../data/userFeatureSelection";
import userProfileModal from "./userProfileModal";

const userFeatureSelectionModal = new Modal(
  document.getElementById("userFeatureSelectionModal"),
  { backdrop: "static", keyboard: false }
);

const checkboxState: Map<UserFeatureEnum, boolean> =
  SelectedFeatureService.getCurrentFeatures();

function render(): void {
  //create checkboxes and headings
  UserFeatureSelection.forEach((v, k) => {
    const checkbox_div = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    checkbox_div.className = "form-check";

    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.id = v.id;

    checkbox.checked = checkboxState.get(k) ?? v.isCheckedDefault;
    checkboxState.set(k, v.isCheckedDefault);
    checkbox.onchange = () => {
      checkboxState.set(k, checkbox.checked);
    };

    label.className = "form-check-label";
    label.htmlFor = v.id;
    label.innerText = v.name;

    checkbox_div.appendChild(checkbox);
    checkbox_div.appendChild(label);

    if (v.accessibleFeature) {
      document.getElementById("userAccessibleFeatureList").append(checkbox_div);
    } else {
      document.getElementById("userFeatureList").append(checkbox_div);
    }
  });

  setFeatures(checkboxState);

  const saveFeaturesButton = document.getElementById("saveFeatures");
  saveFeaturesButton.onclick = () => setFeatures(checkboxState);
}

function hide(): void {
  userFeatureSelectionModal.hide();
}

function setFeatures(checkboxState: Map<UserFeatureEnum, boolean>): void {
  SelectedFeatureService.setCurrentFeatures(checkboxState);
  userProfileModal.hideAll();
}

export default {
  hide,
  render,
};
