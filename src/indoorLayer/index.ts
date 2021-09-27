import * as L from 'leaflet';
import {GeoJSON, Layer, LayerGroup, LeafletMouseEvent} from "leaflet";

import {Map} from "../map";
import {DescriptionPopup} from "../ui/_descriptionPopup";

import {highlightSelectedFeature} from "./_highlightSelectedFeature";
import {featureStyle} from "./_featureStyle";
import {featureAccessibilityDescription} from "./_featureAccessibilityDescription";
import {featureScreenAccessibility} from "./_featureScreenAccessibility";
import {featureAccessibilityIcon} from "./_featureAccessibilityIcon";

export class IndoorLayer {
    private readonly indoorLayerGroup: LayerGroup;

    constructor(geoJSON: GeoJSON.FeatureCollection) {
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
        const layer = new L.GeoJSON(geoJSON, {
            style: featureStyle,
            onEachFeature: IndoorLayer.onEachFeature,
            pointToLayer: () => null
        });
        this.indoorLayerGroup.addLayer(layer);
        featureScreenAccessibility()
    }

    private static onEachFeature(feature: GeoJSON.Feature<any, any>, layer?: Layer) {
        featureAccessibilityIcon(feature);

        layer.on('click', (e: LeafletMouseEvent) => {
            const accessibilityDescription = featureAccessibilityDescription(e);
            DescriptionPopup.update(accessibilityDescription);
            highlightSelectedFeature(e);
        });
    }
}
