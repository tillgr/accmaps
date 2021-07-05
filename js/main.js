import {createMap} from './_map';
import {findBuilding} from "./findBuilding";
import {getOverpassData} from "./_getOverpassData";
import {createIndoorLayer} from "./_indoorLayer";


import {Modal} from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";
import {geoJSON} from "leaflet/dist/leaflet-src.esm";

const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');

document.addEventListener('DOMContentLoaded', function () {
    loading();

    initMaterialize();
    createMap();

    getOverpassData().then(() => {
        loadingEnd();
        createIndoorLayer();
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
