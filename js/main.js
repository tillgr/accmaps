import "materialize-css/dist/js/materialize";

import {createMap} from './_map';

// == CSS ==
import "materialize-css/dist/css/materialize.css";
import "leaflet/dist/leaflet.css";
import "../css/style.css";

M.AutoInit();


document.addEventListener('DOMContentLoaded', function () {
    createMap();
});
