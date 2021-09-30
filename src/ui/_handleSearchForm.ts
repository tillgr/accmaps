import {BuildingControl} from "../buildingControl";
import {showSearchErrorMsg} from "./_showSearchErrorMsg";
import {Map} from "../map";
import {LatLng} from "leaflet";
import {Modal} from "materialize-css";

export function handleSearchForm(): void {
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
