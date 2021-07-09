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


const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');

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

    buildingSearchSubmit.addEventListener('click', findBuilding);

});

function initMaterialize() {
    const modal = document.querySelectorAll('.modal');
    Modal.init(modal);
}
