import UserProfileModal from "./components/ui/userProfileModal";
import SearchForm from "./components/ui/searchForm";
import IndoorSearchForm from "./components/ui/indoorSearch";

document.addEventListener("DOMContentLoaded", function () {
  SearchForm.render();
  UserProfileModal.render();
  IndoorSearchForm.render();
});
