import * as L from 'leaflet';
import {GeoJsonObject} from "geojson";
import {GeoJSON, LayerGroup, LeafletEvent} from "leaflet";

import {Map} from "../map";
import {DescriptionPopup} from "../ui/_descriptionPopup";

import {highlightSelectedFeature} from "./_highlightSelectedFeature";
import {featureStyle} from "./_featureStyle";
import {featureAccessibilityDescription} from "./_featureAccessibilityDescription";
import {featureScreenAccessibility} from "./_featureScreenAccessibility";

export class Index {
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
            style: featureStyle,
            onEachFeature: Index.onEachFeature,
            pointToLayer: () => null
        });
        this.indoorLayerGroup.addLayer(layer);
        featureScreenAccessibility()
    }

    private static onEachFeature(feature: GeoJSON.Feature<any, any>, layer?: any) {
        layer.on('click', (e: LeafletEvent) => {
            const accessibilityDescription = featureAccessibilityDescription(e);
            DescriptionPopup.update(accessibilityDescription);
            highlightSelectedFeature(e);
        });
    }
}
