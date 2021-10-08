import {UserProfileModal} from "./ui/_userProfileModal";
import {handleSearchForm} from "./ui/_handleSearchForm";

import { Modal } from 'bootstrap';

document.addEventListener('DOMContentLoaded', function () {
    handleSearchForm();
    UserProfileModal.create();
});
