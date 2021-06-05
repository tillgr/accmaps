import * as L from 'leaflet/src/Leaflet';
import './leaflet-indoor';

const INDOOR_ZOOM_LEVEL = 17;
const INDOOR_LEVEL = 0;
const WALL_WEIGHT = 3;
const FILL_OPACITY = 1;

export function createMap() {
    const osmUrl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png ';

    const osmTileLayer = new L.TileLayer(osmUrl, {
        maxZoom: 19,
        attribution: "Map data &copy; OpenStreetMap contributors"
    });

    const map = new L.Map('map', {
        center: new L.LatLng(51.0255439, 13.722259),
        zoom: 19
    });

    osmTileLayer.addTo(map);

    map.on('popupopen', function (popup) {
        // shift focus to the popup when it opens
        $(popup.popup._container).find('.my-popup-content').attr('tabindex', '-1').focus();

        // move the close button to the end of the popup content so screen readers reach it
        // after the main popup content, not before
        var close = $(popup.popup._container).find('.leaflet-popup-close-button');
        $(popup.popup._container).find('.leaflet-popup-close-button').remove();
        close.attr('title', 'Close item');
        $(popup.popup._container).append(close);
    });

    // return focus to the icon we started from before opening the pop up
    map.on('popupclose', function (popup) {
        $(popup.popup._source._icon).focus();
    });
    /*
        const indoorLayer = createIndoorLayer();
        indoorLayer.addTo(map);

        const levelControl = createLevelControl(indoorLayer);
        levelControl.addTo(map);
     */
}


function createIndoorLayer() {
    const indoorLayer = new L.Indoor(geoJSON, {
        getLevel: function (feature) {
            return feature.properties.tags.level
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(JSON.stringify(feature.properties, null, 10));
        },
        style: tagFilter
    });

    indoorLayer.setLevel(INDOOR_LEVEL);

    return indoorLayer;
}

function createLevelControl(indoorLayer) {
    const levelControl = new L.Control.Level({
        level: "0",
        levels: indoorLayer.getLevels()
    });

    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);
    return levelControl;
}

function tagFilter(feature) {
    let fill = 'white';
    let wallColor = '#000';
    let opacity = FILL_OPACITY;
    let wall_weight = -INDOOR_ZOOM_LEVEL + 1 + mymap.getZoom();

    if (feature.properties.tags.amenity === 'toilets') {
        fill = '#dfed64';
    } else if (feature.properties.tags.indoor === "room") {
        fill = '#0A485B';
    }

    if (feature.properties.tags.stairs) {
        wallColor = '#000';
    }

    return {
        fillColor: fill,
        weight: wall_weight,
        color: wallColor,
        fillOpacity: opacity
    };
}


