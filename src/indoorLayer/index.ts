import * as L from 'leaflet';
import {GeoJSON, Layer, LayerGroup, LeafletMouseEvent, Marker} from "leaflet";

import {Map} from "../map";
import {DescriptionArea} from "../ui/_descriptionArea";

import {highlightSelectedFeature} from "./_highlightSelectedFeature";
import {featureStyle} from "./_featureStyle";
import {featureAccessibilityDescription} from "./_featureAccessibilityDescription";
import {featureScreenAccessibility} from "./_featureScreenAccessibility";
import {featureAccessibilityMarker} from "./_featureAccessibilityMarker";

let accessibilityMarkers: Marker[] = [];

export class IndoorLayer {
    private readonly indoorLayerGroup: LayerGroup;

    constructor(geoJSON: GeoJSON.FeatureCollection) {
        IndoorLayer.removeAccessibilityMarkers();

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

    updateLayer(geoJSON: GeoJSON.FeatureCollection): void {
        this.clearIndoorLayer();
        this.drawIndoorLayerByGeoJSON(geoJSON);
    }

    private drawIndoorLayerByGeoJSON(geoJSON: GeoJSON.FeatureCollection) {
        IndoorLayer.removeAccessibilityMarkers();

        const layer = new L.GeoJSON(geoJSON, {
            style: featureStyle,
            onEachFeature: IndoorLayer.onEachFeature,
            pointToLayer: () => null
        });
        this.indoorLayerGroup.addLayer(layer);
        featureScreenAccessibility()
    }

    private static onEachFeature(feature: GeoJSON.Feature<any, any>, layer?: Layer) {
        const marker = featureAccessibilityMarker(feature);
        if (marker) {
            marker.addTo(Map.get());
            accessibilityMarkers.push(marker);
        }

        layer.on('click', (e: LeafletMouseEvent) => {
            const accessibilityDescription = featureAccessibilityDescription(e);
            DescriptionArea.update(accessibilityDescription);
            highlightSelectedFeature(e);
        });
    }


    private static removeAccessibilityMarkers() {
        for (let i = 0; i < accessibilityMarkers.length; i++) {
            Map.get().removeLayer(accessibilityMarkers[i]);
        }
        accessibilityMarkers = [];
    }
}
