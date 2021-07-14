import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";
import {getMap} from "./_map";
import {updateDescriptionPopUp} from "./_descriptionPopup";


export class IndoorLayer {
    constructor(geoJSON) {
        const map = getMap();

        this.indoorLayerGroup = L.layerGroup();
        this.indoorLayerGroup.addTo(map);

        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    drawIndoorLayerByGeoJSON(geoJSON) {
        const layer = L.geoJson(geoJSON, {
            style: this.featureStyle,
            onEachFeature: this.onEachFeature.bind(this),
            pointToLayer: (feature, latlng) => {
                // avoid icons to be drawn, instead create simple div
                L.marker(latlng, {icon: L.divIcon()});
            }
        });
        this.indoorLayerGroup.addLayer(layer);
    }

    clearIndoorLayer() {
        this.indoorLayerGroup.clearLayers();
    }

    updateLayer(geoJSON) {
        this.clearIndoorLayer();
        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    onEachFeature(feature, layer) {
        if (layer._path !== undefined) {
            layer._path.setAttribute('role', 'button');
        }
        layer.on('click', this.openDescriptionPopUp);
    }

    openDescriptionPopUp(e) {
        const feature = e.sourceTarget.feature;

        let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';
        let cellName = feature.properties.name;

        if (cellName !== undefined && cellName.length !== 0) {
            popUpText += ' (' + cellName + ')';
        }

        popUpText = 'selected map object: ' + popUpText;

        updateDescriptionPopUp(popUpText);
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
