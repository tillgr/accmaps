import 'leaflet/dist/leaflet';

import {mapAccessibility} from "./_mapAccessibility";
import {osmTileServer} from "./constants";

L.Icon.Default.imagePath = '/assets/icons';

let mapInstance = null;

export class Map {
    constructor() {
        if(mapInstance !== null){
            return mapInstance;
        }

        const osmTileLayer = new L.TileLayer(osmTileServer, {maxZoom: 19});
        const mapIcon = L.divIcon(); // use Div instead of icon images

        const map = new L.Map('map', {
            center: new L.LatLng(51.0255439, 13.722780),
            zoom: 19,
            icon: mapIcon
        });

        osmTileLayer.addTo(map);
        mapAccessibility();

        return mapInstance = map;
    }

    static getMap() {
        if (mapInstance === null) {
            mapInstance = new Map();
            console.log('erstellt3');
        }
        return mapInstance;
    }
}

export const getMap = Map.getMap;
