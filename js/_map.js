import 'leaflet/dist/leaflet';

import {mapAccessibility} from "./_mapAccessibility";

import {osmTileServer} from "./constants";

let map;

L.Icon.Default.imagePath = '/assets/icons';

export function createMap() {
    const osmTileLayer = new L.TileLayer(osmTileServer, {maxZoom: 19});
    const mapIcon = L.divIcon(); // use Div instead of icon images

    map = new L.Map('map', {
        center: new L.LatLng(51.0255439, 13.722780),
        zoom: 19,
        icon: mapIcon
    });

    osmTileLayer.addTo(map);
    mapAccessibility();
}

export {map};
