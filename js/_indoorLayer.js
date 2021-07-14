import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";
import {getMap} from "./_map";


export class IndoorLayer {
    constructor(geoJSON) {
        const map = getMap();

        this.indoorLayerGroup = L.layerGroup();
        this.indoorLayerGroup.addTo(map);

        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    drawIndoorLayerByGeoJSON(geoJSON){
        const layer = L.geoJson(geoJSON, {
            style: this.featureStyle
        });
        this.indoorLayerGroup.addLayer(layer);
    }

    clearIndoorLayer() {
        this.indoorLayerGroup.clearLayers();
    }

    updateLayer(geoJSON){
        this.clearIndoorLayer();
        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    featureStyle(feature) {
        let fill = '#fff';

        if (feature.properties.amenity === 'toilets') {
            fill = TOILET_COLOR;
        } else if (feature.properties.indoor === 'room') {
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
}
