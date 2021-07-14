import {findBuilding} from "./findBuilding";
import {getOverpassData} from "./_getOverpassData";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";
import {filterGeoJsonData} from "./_filterGeoJsonData";
import {LevelControl} from "./_levelControl";
import {getMap} from "./_map";


import {Modal} from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";

document.addEventListener('DOMContentLoaded', function () {
    loading();

    initMaterialize();
    getMap();

    getOverpassData().then((data) => {
        loadingEnd();
        filterGeoJsonData(data);
        new LevelControl();
    }).catch((error) => {
        console.log(error)
        loadingError();
    });

    handleSearchForm();
});

function initMaterialize() {
    const modal = document.querySelectorAll('.modal');
    Modal.init(modal);
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
