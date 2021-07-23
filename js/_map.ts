import * as L from 'leaflet';

import {mapAccessibility} from "./_mapAccessibility";
import {osmTileServer} from "./constants";


let mapInstance: L.Map = null;

export const Map = {
    createMap() {
        L.Icon.Default.imagePath = '/assets/icons';

        const osmTileLayer = new L.TileLayer(osmTileServer, {maxZoom: 19});

        mapInstance = new L.Map('map', {
            center: new L.LatLng(51.0255439, 13.722780),
            zoom: 19
        });

        osmTileLayer.addTo(mapInstance);
        mapInstance.on('load', mapAccessibility)
        return mapInstance;
    },

    getMap() {
        if (mapInstance === null) {
            mapInstance = Map.createMap();
        }

        return mapInstance;
    }
}
