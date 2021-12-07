import { UserProfileModal } from "./components/ui/_userProfileModal";
import { handleSearchForm } from "./components/ui/navbar_handleSearchForm";

document.addEventListener("DOMContentLoaded", function () {
  handleSearchForm();
  UserProfileModal.create();
});
