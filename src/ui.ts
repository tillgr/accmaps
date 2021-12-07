import { UserProfileModal } from "./components/ui/userProfileModal";
import { handleSearchForm } from "./components/ui/searchForm";

document.addEventListener("DOMContentLoaded", function () {
  handleSearchForm();
  UserProfileModal.create();
});
