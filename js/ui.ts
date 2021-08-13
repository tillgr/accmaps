import {Modal} from 'materialize-css';
import {Map} from "./map";
import {LatLng} from "leaflet";
import {BuildingControl} from "./buildingControl";


// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";
import {UserProfile} from "./userProfile";
import {UserGroup} from "./data/userGroup";


document.addEventListener('DOMContentLoaded', function () {
    initMaterialize();
    handleSearchForm();
    selectUserprofile();
});

function initMaterialize() {
    const searchModal = document.getElementById('buildingSearchModal');
    const userProfileModal = document.getElementById('userProfileModal');

    Modal.init(searchModal, {
        onOpenEnd: () => {
            document.getElementById('buildingSearch').focus();
        }
    });

    Modal.init(userProfileModal, {}).open();
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


function runBuildingSearch(buildingSearchInput: HTMLInputElement) {
    const searchString = buildingSearchInput.value;

    BuildingControl.searchForBuilding(searchString).then(() => {
        centerMapToBuilding();
        closeSearchModal();
    }).catch((errorMessage) => {
        showSearchErrorMsg(errorMessage);
    });
}

function centerMapToBuilding() {
    const currentBuildingBBox = BuildingControl.getCurrentBuildingBoundingBox();

    if (currentBuildingBBox !== null) {
        const center = currentBuildingBBox.getCenter();
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

function selectUserprofile(){
    document.getElementById('userProfileNormal').addEventListener('click', ()=> setUserprofile(UserGroup.noImpairments));
    document.getElementById('userProfileVI').addEventListener('click', ()=> setUserprofile(UserGroup.blindPeople));
    document.getElementById('userProfileWheelchair').addEventListener('click', ()=> setUserprofile(UserGroup.blindPeople));
}

function setUserprofile(userGroup: UserGroup){
    UserProfile.set(userGroup);
    const modal = document.getElementById('userProfileModal');
    Modal.getInstance(modal).close();
}
