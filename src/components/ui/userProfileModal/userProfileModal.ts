import UserService from "../../../services/userService";
import SelectedFeatureService from "../../../services/selectedFeaturesService";

import { UserGroups } from "../../../data/userGroups";
import { UserSettings } from "../../../data/userSettings";
import { UserFeatureSelection } from "../../../data/userFeatureSelection";
import { UserGroupEnum } from "../../../models/userGroupEnum";
import { UserFeatureEnum } from "../../../models/userFeatureEnum";

import { Modal } from "bootstrap";
import userService from "../../../services/userService";

const userProfileModal = new Modal(
  document.getElementById("userProfileModal"),
  { backdrop: "static", keyboard: false }
);
userProfileModal.hide();

const userFeatureSelectionModal = new Modal(
  document.getElementById("userFeatureSelectionModal"),
  { backdrop: "static", keyboard: false }
);
userFeatureSelectionModal.hide();

const checkboxState: Map<UserFeatureEnum, boolean> =
  SelectedFeatureService.getCurrentSelectedFeatures();

function render(): void {
  const selectedUserProfile = userService.getCurrentProfile();
  if (selectedUserProfile !== null) {
    hideAll();
    document.getElementById("changeUserProfileBtn").onclick = show;
  } else {
    show();
  }

  UserGroups.forEach((v, k) => {
    const button = document.createElement("a");
    button.href = "#map";
    button.className =
      "list-group-item d-flex justify-content-between align-items-start";
    button.innerHTML =
      v.name +
      ' <span aria-hidden="true"><i class="material-icons">' +
      v.icon +
      "</i></span>";
    button.onclick = () => setUserProfile(k);

    if (UserService.getCurrentProfile() === k) {
      button.classList.add("active");
    }

    document.getElementById("userProfileList").append(button);
  });

  UserSettings.forEach((v) => {
    const button = document.createElement("a");
    button.href = "#map";
    button.setAttribute("data-bs-target", v.linkedModal);
    button.setAttribute("data-bs-toggle", "modal");

    button.className =
      "list-group-item d-flex justify-content-between align-items-start";
    button.innerHTML =
      v.name +
      ' <span aria-hidden="true"><i class="material-icons">' +
      v.icon +
      "</i></span>";

    document.getElementById("userSettingsList").append(button);
  });

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

  const saveButtonFeatureList = document.getElementById("saveFeatures");
  saveButtonFeatureList.onclick = () => setFeatures(checkboxState);
}

function show(): void {
  userProfileModal.show();
  document.getElementById("userProfileList").focus();
}

function hideAll(): void {
  userProfileModal.hide();
  userFeatureSelectionModal.hide();
}

function setUserProfile(userGroup: UserGroupEnum): void {
  UserService.setProfile(userGroup);
  hideAll();
}

function setFeatures(checkboxState: Map<UserFeatureEnum, boolean>): void {
  SelectedFeatureService.set(checkboxState);
  hideAll();
}

export default {
  render,
  show,
  hideAll,
  setUserProfile,
};
