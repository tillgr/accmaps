import {LatLng, Map as LeafletMap, TileLayer} from 'leaflet';

import {mapAccessibility} from "./_mapAccessibility";
import {OSM_TILE_SERVER} from "./constants";


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
    const osmTileLayer = new TileLayer(OSM_TILE_SERVER, {maxZoom: 19});

    mapInstance = new LeafletMap('map', {
        center: new LatLng(51.0255439, 13.722780),
        zoom: 19
    });

    osmTileLayer.addTo(mapInstance);
    mapInstance.on('load', mapAccessibility)
    return mapInstance;
}
