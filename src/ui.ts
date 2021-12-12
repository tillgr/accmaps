import { UserProfileModal } from "./components/ui/userProfileModal";
import { handleChange } from "./components/ui/searchForm";

document.addEventListener("DOMContentLoaded", function () {
  handleChange();
  UserProfileModal.create();
});
