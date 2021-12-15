import { UserProfileModal } from "./components/ui/userProfileModal";
import SearchForm from "./components/ui/searchForm";

document.addEventListener("DOMContentLoaded", function () {
  SearchForm.handleChange();
  UserProfileModal.create();
});
