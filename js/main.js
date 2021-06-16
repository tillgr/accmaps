import {createMap} from './_map';
import {findBuilding} from "./findBuilding";


import M from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";

const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');

document.addEventListener('DOMContentLoaded', function () {
    createMap();
    M.AutoInit();
});

buildingSearchSubmit.addEventListener('click', findBuilding);
