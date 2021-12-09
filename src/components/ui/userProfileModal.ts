import { UserService } from "../../services/userService/userService";
import { UserGroups } from "../../services/data/userGroups";
import { UserGroupEnum } from "../../models/userGroupEnum";

import { Modal } from "bootstrap";

const userProfileModal = new Modal(
  document.getElementById("userProfileModal"),
  { backdrop: "static", keyboard: false }
);
userProfileModal.hide();

export const UserProfileModal = {
  create(): void {
    const selectedUserProfile = localStorage.getItem("userService");
    if (selectedUserProfile !== null) {
      UserProfileModal.close();
      document.getElementById("changeUserProfileBtn").onclick =
        UserProfileModal.show;
    } else {
      UserProfileModal.show();
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
      button.onclick = () => UserProfileModal.setUserProfile(k);

      if (UserService.get() === k) {
        button.classList.add("active");
      }

      document.getElementById("userProfileList").append(button);
    });
  },

  show(): void {
    userProfileModal.show();
    document.getElementById("userProfileList").focus();
  },

  close(): void {
    userProfileModal.hide();
  },

  setUserProfile(userGroup: UserGroupEnum): void {
    UserService.set(userGroup);
    localStorage.setItem("userService", userGroup.toString());
    UserProfileModal.close();
  },
};
