import 'leaflet/src/Leaflet';
import './leafletIndoor'

import {filterGeoJsonData} from "./_filterGeoJsonData";
import {getOverpassData} from "./_getOverpassData";

import osmtogeojson from "osmtogeojson";

import {
    osmTileServer,
    FILL_OPACITY,
    ROOM_COLOR,
    STAIR_COLOR,
    WALL_COLOR,
    WALL_WEIGHT,
    INDOOR_LEVEL,
    TOILET_COLOR
} from "./constants";

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

    getOverpassData(map, createIndoorLayer);

    mapAccessibility();
}


function createIndoorLayer(data) {
    let geoJSON = osmtogeojson(data, {
        polygonFeatures: {
            'building:part': true
        }
    });

    geoJSON = filterGeoJsonData(geoJSON);

    const indoorLayer = new L.Indoor(geoJSON, {
        onEachFeature: (feature, layer) => {
            let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';
            let cellName = feature.properties.name;
            if (cellName !== undefined && cellName.length !== 0) {
                popUpText += '&nbsp;(' + cellName + ')';
            }
            layer.bindPopup(popUpText);
            layer.options.alt = popUpText;
        },
        style: featureStyle
    });

    indoorLayer.setLevel(INDOOR_LEVEL);
    indoorLayer.addTo(map);

    createLevelControl(indoorLayer);
}

function createLevelControl(indoorLayer) {
    const levelControl = new L.Control.Level({
        level: "0",
        levels: indoorLayer.getLevels()
    });

    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);
    levelControl.addTo(map);
}

function featureStyle(feature) {
    let fill = '#fff';

    if (feature.properties.amenity === 'toilets') {
        fill = TOILET_COLOR;
    } else if (feature.properties.indoor === "room") {
        fill = ROOM_COLOR;
    } else if (feature.properties.stairs) {
        fill = STAIR_COLOR;
    }

    return {
        fillColor: fill,
        weight: WALL_WEIGHT,
        color: WALL_COLOR,
        fillOpacity: FILL_OPACITY
    };
}

function mapAccessibility() {
    const leafletShadows = document.getElementsByClassName('leaflet-shadow-pane');

    while (leafletShadows[0]) {
        leafletShadows[0].parentNode.removeChild(leafletShadows[0]);
    }

    const mapTiles = document.querySelectorAll('.leaflet-tile-container img, .leaflet-shadow-pane img');

    [].forEach.call(mapTiles, (tile) => {
        tile.setAttribute('role', 'presentation');
        tile.setAttribute('alt', '');
    });

    map.on('popupopen', (popup) => {
        let popUpContent = popup.popup._container.getElementsByClassName('leaflet-popup-content')[0];
        let popUpCloseButton = popup.popup._container.getElementsByClassName('leaflet-popup-close-button')[0];

        popUpContent.setAttribute('tabindex', '-1');
        popUpContent.focus();

        popUpCloseButton.setAttribute('title', 'Close item');
        //re-add close button to end of popup
        popUpCloseButton.parentNode.removeChild(popUpCloseButton);
        popup.popup._container.append(popUpCloseButton)
    });

    // return focus to the icon we started from before opening the pop up
    map.on('popupclose', (popup) => {
        popup.popup._source._path.focus();
    });

}
