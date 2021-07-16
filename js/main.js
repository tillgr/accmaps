import {findBuilding} from "./findBuilding";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";
import {getMap} from "./_map";

import {Modal} from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";
import {OverpassData} from "./_overpassData";
import {IndoorLayer} from "./_indoorLayer";

document.addEventListener('DOMContentLoaded', function () {
    loading();
    initMaterialize();

    getMap();

    OverpassData.fetchOverpassData().then(() => {
        loadingEnd();
        new IndoorLayer();
    }).catch((error) => {
        console.log(error)
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

    buildingSearchSubmit.addEventListener('click', findBuilding);
    buildingSearch.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            findBuilding()
        }
    })
}
