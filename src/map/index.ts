import {LatLng, Map as LeafletMap, TileLayer} from 'leaflet';

import {mapAccessibility} from "./_mapAccessibility";
import {MAP_START_LAT, MAP_START_LNG, OSM_TILE_SERVER} from "../data/constants";

let mapInstance: LeafletMap = null;

export const Map = {
    get(): LeafletMap {
        if (mapInstance === null) {
            mapInstance = createMap();
        }

        return mapInstance;
    }
}

function createMap() {
    const osmTileLayer = new TileLayer(OSM_TILE_SERVER, {maxZoom: 21});

    mapInstance = new LeafletMap('map', {
        center: new LatLng(MAP_START_LAT, MAP_START_LNG),
        zoom: 19
    });

    osmTileLayer.addTo(mapInstance);
    mapInstance.on('load', mapAccessibility)
    return mapInstance;
}
