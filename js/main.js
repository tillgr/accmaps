import {createMap} from './_map';
import {_findBuilding} from "./_findBuilding";


import {Modal} from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";

const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');

document.addEventListener('DOMContentLoaded', function () {
    createMap();
    initMaterialize();
    buildingSearchSubmit.addEventListener('click', _findBuilding);

});

function initMaterialize() {
    const modal = document.querySelectorAll('.modal');
    Modal.init(modal);
}
