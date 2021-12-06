import {LatLng, Map as LeafletMap, TileLayer} from 'leaflet';

import {mapAccessibility} from "./_mapAccessibility";
import {MAP_START_LAT, MAP_START_LNG, OSM_ATTRIBUTION, OSM_TILE_SERVER} from "../services/data/constants";

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
    const osmTileLayer = new TileLayer(OSM_TILE_SERVER, {maxZoom: 21, attribution: OSM_ATTRIBUTION});

    mapInstance = new LeafletMap('map', {
        center: new LatLng(MAP_START_LAT, MAP_START_LNG),
        zoom: 19
    }).on('moveend', mapAccessibility).on('load', mapAccessibility).on('zoomend', mapAccessibility);
    mapInstance.whenReady(mapAccessibility);

    osmTileLayer.addTo(mapInstance);
    return mapInstance;
}
