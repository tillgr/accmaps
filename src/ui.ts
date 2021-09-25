import {Modal} from 'materialize-css';
import {Map} from "./map";
import {LatLng} from "leaflet";
import {BuildingControl} from "./buildingControl";
import {UserProfileModal} from "./ui/_userProfileModal";

document.addEventListener('DOMContentLoaded', function () {
    initMaterialize();
    handleSearchForm();
    initUserProfileChangeButtons();
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

function handleSearchForm() {
    const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');
    const buildingSearchInput = document.getElementById('buildingSearch');

    buildingSearchSubmit.addEventListener('click', () => {
        runBuildingSearch(<HTMLInputElement>buildingSearchInput);
    });

    buildingSearchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            runBuildingSearch(<HTMLInputElement>buildingSearchInput);
        }
    });
}

function initUserProfileChangeButtons() {
    const sideNav = document.getElementById('sidenav');

    M.Sidenav.init(sideNav, {});

    document.getElementById('changeUserProfileBtn1').onclick = () => {
        UserProfileModal.show();
        M.Sidenav.getInstance(sideNav).close()
    };
    document.getElementById('changeUserProfileBtn2').onclick = () => {
        UserProfileModal.show();
        M.Sidenav.getInstance(sideNav).close()
    };
}

function runBuildingSearch(buildingSearchInput: HTMLInputElement) {
    const searchString = buildingSearchInput.value;

    BuildingControl.searchAndShowBuilding(searchString).then(() => {
        centerMapToBuilding();
        closeSearchModal();
    }).catch((errorMessage) => {
        showSearchErrorMsg(errorMessage);
    });
}

function centerMapToBuilding() {
    const center = BuildingControl.getCurrentBuildingCenter();

    if (center !== null) {
        //strange behaviour: getCenter returns values in wrong order - leaflet bug?
        Map.get().panTo(new LatLng(center.lng, center.lat));
    }
}

function closeSearchModal() {
    const elems = document.querySelectorAll(".modal");
    Modal.getInstance(elems[0]).close();
}

function showSearchErrorMsg(errorMessage: string) {
    const buildSearchErrorMsg = document.getElementById('searchErrorMessage');
    const buildSearchErrorMsgContainer = buildSearchErrorMsg.parentElement;

    buildSearchErrorMsg.innerHTML = errorMessage;
    buildSearchErrorMsgContainer.classList.remove('scale-out');
    buildSearchErrorMsgContainer.classList.add('scale-in');
    buildSearchErrorMsg.focus();

    window.setTimeout(() => {
        buildSearchErrorMsgContainer.classList.remove('scale-in');
        buildSearchErrorMsgContainer.classList.add('scale-out');
    }, 5000)
}
