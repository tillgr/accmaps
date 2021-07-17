import {loading, loadingEnd, loadingError} from "./_loading_indicator";
import {Map} from "./_map";
import {OverpassData} from "./_overpassData";
import {BuildingControl} from "./_buildingControl";


import {Modal} from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";
import {LevelControl} from "./_levelControl";


document.addEventListener('DOMContentLoaded', function () {
    loading();
    initMaterialize();

    Map.getMap();

    OverpassData.fetchOverpassData().then(() => {
        loadingEnd();
        LevelControl.getInstance();
    }).catch((error) => {
        loadingError();
    });

    handleSearchForm();
});

function initMaterialize() {
    const modal = document.querySelectorAll('.modal');
    Modal.init(modal, {
        onOpenEnd: () => {
            document.getElementById('buildingSearch').focus();
        }
    });
}


function handleSearchForm() {
    const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');
    const buildingSearch = document.getElementById('buildingSearch');

    buildingSearchSubmit.addEventListener('click', BuildingControl.searchForBuilding);
    buildingSearch.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            BuildingControl.searchForBuilding();
        }
    })
}
