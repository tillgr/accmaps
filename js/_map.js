import 'leaflet/dist/leaflet';

import {mapAccessibility} from "./_mapAccessibility";
import {osmTileServer} from "./constants";

L.Icon.Default.imagePath = '/assets/icons';

let mapInstance = null;

export class Map {
    static createMap() {
        const osmTileLayer = new L.TileLayer(osmTileServer, {maxZoom: 19});

        mapInstance = new L.Map('map', {
            center: new L.LatLng(51.0255439, 13.722780),
            zoom: 19
        });

        osmTileLayer.addTo(mapInstance);
        mapAccessibility();
        mapInstance.on('moveend', mapAccessibility);
        return mapInstance;
    }

    static getMap() {
        if (mapInstance === null) {
            mapInstance = Map.createMap();
        }

        return mapInstance;
    }
}
