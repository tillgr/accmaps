import {UserProfileModal} from "./ui/_userProfileModal";
import {handleSearchForm} from "./ui/_handleSearchForm";

document.addEventListener('DOMContentLoaded', function () {
    handleSearchForm();
    UserProfileModal.create();
});
