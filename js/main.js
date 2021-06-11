import {createMap} from './_map';

import M from 'materialize-css';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";

document.addEventListener('DOMContentLoaded', function () {
    createMap();
    M.AutoInit();
});
