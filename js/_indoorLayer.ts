import * as L from 'leaflet';
import {GeoJsonObject} from "geojson";
import {GeoJSON, LayerGroup, LeafletEvent} from "leaflet";

import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";
import {Map} from "./_map";
import {DescriptionPopup} from "./_descriptionPopup";
import {FeatureAccessibilityPropertiesInterface} from "./interfaces/featureAccessibilityPropertiesInterface";
import {featureAccessibilityProperties} from "./data/featureAccessibilityProperties";


export class IndoorLayer {
    private readonly indoorLayerGroup: LayerGroup;

    constructor(geoJSON: GeoJSON.FeatureCollection<any>) {
        this.indoorLayerGroup = new LayerGroup();
        this.indoorLayerGroup.addTo(Map.get());
        this.drawIndoorLayerByGeoJSON(geoJSON)
    }

    removeIndoorLayerFromMap(): void {
        Map.get().removeLayer(this.indoorLayerGroup);
    }

    clearIndoorLayer(): void {
        this.indoorLayerGroup.clearLayers();
    }

    updateLayer(geoJSON: GeoJsonObject): void {
        this.clearIndoorLayer();
        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    private drawIndoorLayerByGeoJSON(geoJSON: GeoJsonObject) {
        const layer = new L.GeoJSON(geoJSON, {
            style: IndoorLayer.featureStyle,
            onEachFeature: IndoorLayer.onEachFeature,
            pointToLayer: () => null
        });
        this.indoorLayerGroup.addLayer(layer);
        IndoorLayer.makeFeaturesAccessible();
    }

    private static makeFeaturesAccessible() {
        const featurePaths = document.getElementsByClassName('leaflet-interactive');
        for (let i = 0; i < featurePaths.length; i++) {
            featurePaths[i].setAttribute('role', 'button');
        }
    }

    private static onEachFeature(feature: GeoJSON.Feature<any, any>, layer?: any) {
        if (layer._path !== undefined) {
            layer._path.setAttribute('role', 'button');
        }
        layer.on('click', (e: LeafletEvent) => {
            const accessibilityDescription = IndoorLayer.generateAccessibilityDescription(e);
            DescriptionPopup.update(accessibilityDescription);
        });
    }

    private static featureStyle(feature: GeoJSON.Feature<any>) {
        let fill = '#fff';

        if (feature.properties.amenity === 'toilets') {
            fill = TOILET_COLOR;
        } else if (feature.properties.stairs || (feature.properties.highway && (feature.properties.highway == 'elevator' || feature.properties.highway == 'escalator'))) {
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

    private static generateAccessibilityDescription(e: LeafletEvent): string {
        const feature = e.sourceTarget.feature;
        let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';

        if (feature.properties.name !== undefined && feature.properties.name.length !== 0) {
            popUpText += ' (' + feature.properties.name + ')';
        }

        featureAccessibilityProperties.forEach((e: FeatureAccessibilityPropertiesInterface) => {
            if (feature.properties[e.name] !== undefined &&
                (e.value === true || feature.properties[e.name] === e.value)) {
                popUpText += ', ' + (e.message ? e.message : feature.properties[e.name]);
            }
        })

        console.log(feature.properties);

        return 'selected map object: ' + popUpText;
    }
}
