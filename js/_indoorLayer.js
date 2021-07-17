import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";
import {Map} from "./_map";
import {OverpassData} from "./_overpassData";
import {updateDescriptionPopUp} from "./_descriptionPopup";
import {filterGeoJsonData} from "./_filterGeoJsonData";

let indoorLayerInstance = null;

export class IndoorLayer {
    constructor() {
        this.createIndoorLayerFromCurrentIndoorData();
    }

    static getInstance() {
        if (indoorLayerInstance === null) {
            return indoorLayerInstance = new IndoorLayer();
        }
        return indoorLayerInstance;
    }

    createIndoorLayerFromCurrentIndoorData() {
        this.currentGeoJSON = filterGeoJsonData(OverpassData.getIndoorData());

        if (this.indoorLayerGroup !== undefined) {
            this.removeIndoorLayerFromMap();
        }

        this.indoorLayerGroup = L.layerGroup();
        this.indoorLayerGroup.addTo(Map.getMap());
        this.drawIndoorLayerByGeoJSON(this.currentGeoJSON);
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

    removeIndoorLayerFromMap() {
        Map.getMap().removeLayer(this.indoorLayerGroup);
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

        if (feature.properties.handrail !== undefined) {
            popUpText += ', handrail available';
        }

        if (feature.properties.tactile_paving !== undefined) {
            popUpText += ', tactile paving available';
        }

        if (feature.properties.amenity !== undefined && feature.properties.amenity === "toilets") {
            popUpText += ', toilet';
            if (feature.properties.female !== undefined && feature.properties.female === 'yes') {
                popUpText += ' (female)';
            } else if (feature.properties.male !== undefined && feature.properties.male === 'yes') {
                popUpText += ' (male)';
            } else {
                popUpText += ' (unisex or unknown)';
            }
        }

        console.log(feature.properties);

        popUpText = 'selected map object: ' + popUpText;


        updateDescriptionPopUp(popUpText);
    }

    featureStyle(feature) {
        let fill = '#fff';

        if (feature.properties.amenity === 'toilets') {
            fill = TOILET_COLOR;
        } else if (feature.properties.stairs) {
            fill = STAIR_COLOR;
        } else if (feature.properties.indoor === 'room') {
            fill = ROOM_COLOR;
        }

        return {
            fillColor: fill,
            weight: WALL_WEIGHT,
            color: WALL_COLOR,
            fillOpacity: FILL_OPACITY
        };
    }
}
