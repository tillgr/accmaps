import {Modal} from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";
import {Map as M} from "./_map";
import {LatLng} from "leaflet";
import {BuildingControl} from "./_buildingControl";


document.addEventListener('DOMContentLoaded', function () {
    initMaterialize();
    handleSearchForm();
});

function handleSearchForm() {
    const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');
    const buildingSearch = document.getElementById('buildingSearch');
    const searchString = (<HTMLInputElement>buildingSearch).value;


    buildingSearchSubmit.addEventListener('click', () => {
        BuildingControl.searchForBuilding(searchString);
        centerMapToBuilding();
        closeSearchModal();
    });

    buildingSearch.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            BuildingControl.searchForBuilding(searchString);
            centerMapToBuilding();
            closeSearchModal();
        }
    })
}

function initMaterialize() {
    const modal = document.querySelectorAll('.modal');
    Modal.init(modal, {
        onOpenEnd: () => {
            document.getElementById('buildingSearch').focus();
        }
    });
}

function centerMapToBuilding() {
    const currentBuildingBBox = BuildingControl.getCurrentBuildingBoundingBox();

    if (currentBuildingBBox !== null) {
        const center = currentBuildingBBox.getCenter();
        //strange behaviour: getCenter returns values in wrong order - leaflet bug?
        M.getMap().panTo(new LatLng(center.lng, center.lat));
    }
}

function closeSearchModal() {
    let elems = document.querySelectorAll(".modal");
    Modal.getInstance(elems[0]).close();
}
