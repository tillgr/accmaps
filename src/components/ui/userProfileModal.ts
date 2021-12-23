import UserService from "../../services/userService";
import { UserGroups } from "../../data/userGroups";
import { UserGroupEnum } from "../../models/userGroupEnum";

import { Modal } from "bootstrap";
import userService from "../../services/userService";

const userProfileModal = new Modal(
  document.getElementById("userProfileModal"),
  { backdrop: "static", keyboard: false }
);
userProfileModal.hide();

function render(): void {
  const selectedUserProfile = userService.getCurrentProfile();
  if (selectedUserProfile !== null) {
    hide();
    document.getElementById("changeUserProfileBtn").onclick = () => show();
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
}

function show(): void {
  userProfileModal.show();
  document.getElementById("userProfileList").focus();
}

function hide(): void {
  userProfileModal.hide();
}

function setUserProfile(userGroup: UserGroupEnum): void {
  UserService.setProfile(userGroup);
  /*  localStorage.setItem("userService", userGroup.toString());*/
  hide();
}

export default {
  render,
  show,
  hide,
  setUserProfile,
};
