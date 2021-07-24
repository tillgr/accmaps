import * as L from 'leaflet';
import {GeoJsonObject} from "geojson";
import {GeoJSON, LayerGroup, LeafletEvent} from "leaflet";

import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";
import {Map} from "./_map";
import {DescriptionPopup} from "./_descriptionPopup";


export class IndoorLayer {
    private readonly indoorLayerGroup: LayerGroup;

    constructor(geoJSON: GeoJSON.FeatureCollection<any>) {
        this.indoorLayerGroup = new LayerGroup();
        this.indoorLayerGroup.addTo(Map.getMap());
        this.drawIndoorLayerByGeoJSON(geoJSON)
    }

    removeIndoorLayerFromMap() {
        Map.getMap().removeLayer(this.indoorLayerGroup);
    }

    clearIndoorLayer() {
        this.indoorLayerGroup.clearLayers();
    }

    updateLayer(geoJSON: GeoJsonObject) {
        this.clearIndoorLayer();
        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    private drawIndoorLayerByGeoJSON(geoJSON: GeoJsonObject) {
        const layer = new L.GeoJSON(geoJSON, {
            style: IndoorLayer.featureStyle,
            onEachFeature: IndoorLayer.onEachFeature,
            pointToLayer: (feature, latlng) => null
        });

        this.indoorLayerGroup.addLayer(layer);

        const featurePaths = document.getElementsByClassName('leaflet-interactive');
        for (let i = 0; i < featurePaths.length; i++) {
            featurePaths[i].setAttribute('role', 'button');
        }
    }

    private static onEachFeature(feature: GeoJSON.Feature<any, any>, layer?: any) {
        if (layer._path !== undefined) {
            layer._path.setAttribute('role', 'button');
        }
        layer.on('click', IndoorLayer.openDescriptionPopUp);
    }

    private static featureStyle(feature: GeoJSON.Feature<any>) {
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

    private static openDescriptionPopUp(e: LeafletEvent) {
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

        popUpText = 'selected map object: ' + popUpText;

        DescriptionPopup.update(popUpText);
    }
}
