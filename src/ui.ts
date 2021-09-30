import {Modal} from 'materialize-css';
import {UserProfileModal} from "./ui/_userProfileModal";
import {handleSearchForm} from "./ui/_handleSearchForm";

document.addEventListener('DOMContentLoaded', function () {
    initMaterialize();
    initUserProfileChangeButtons();
    handleSearchForm();
    UserProfileModal.create();
});

function initMaterialize() {
    const searchModal = document.getElementById('buildingSearchModal');
    const userProfileModal = document.getElementById('userProfileModal');

    Modal.init(searchModal, {
        onOpenEnd: () => {
            document.getElementById('buildingSearch').focus();
        }
    });

    Modal.init(userProfileModal, {});
}

function initUserProfileChangeButtons() {
    const sideNav = document.getElementById('sidenav');

    M.Sidenav.init(sideNav, {});

    [1, 2].forEach((i) => {
        document.getElementById('changeUserProfileBtn' + i).onclick = () => {
            UserProfileModal.show();
            M.Sidenav.getInstance(sideNav).close()
        };
    })
}


