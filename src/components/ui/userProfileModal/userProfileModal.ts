import UserService from "../../../services/userService";
import userService from "../../../services/userService";
import featureSelectionModal from "./featureSelection";
import { UserGroups } from "../../../data/userGroups";
import { UserSettings } from "../../../data/userSettings";
import { UserGroupEnum } from "../../../models/userGroupEnum";
import { Modal } from "bootstrap";

const userProfileModal = new Modal(
  document.getElementById("userProfileModal"),
  { backdrop: "static", keyboard: false }
);
userProfileModal.hide();

function render(): void {
  const selectedUserProfile = userService.getCurrentProfile();
  //create navbar button
  if (selectedUserProfile !== null) {
    hideAll();
    document.getElementById("changeUserProfileBtn").onclick = show;
  } else {
    show();
  }

  renderProfiles(); //profile quick switch
  renderSettings(); //settings

  renderLinkedModals();
}

function renderProfiles(): void {
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
}
function renderSettings(): void {
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
}
function renderLinkedModals() {
  featureSelectionModal.render();
}

function show(): void {
  userProfileModal.show();
  document.getElementById("userProfileList").focus();
}
function hideAll(): void {
  userProfileModal.hide();
  featureSelectionModal.hide();
}

function setUserProfile(userGroup: UserGroupEnum): void {
  UserService.setProfile(userGroup);
  hideAll();
}

export default {
  render,
  show,
  hideAll,
  setUserProfile,
};