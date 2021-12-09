import * as L from "leaflet";
import { GeoJSON, Layer, LayerGroup, LeafletMouseEvent, Marker } from "leaflet";

import { Map } from "./map";
import { DescriptionArea } from "./ui/descriptionArea";

import { highlightSelectedFeature } from "../utils/highlightSelectedFeature";
import {
  getAccessibilityDescription,
  getAccessibilityMarker,
  getFeatureStyle,
} from "../services/featureService";

let accessibilityMarkers: Marker[] = [];

export function featureScreenAccessibility(): void {
  const featurePaths = document.getElementsByClassName("leaflet-interactive");
  for (let i = 0; i < featurePaths.length; i++) {
    featurePaths[i].setAttribute("aria-disabled", "true");
  }

  const markerIcons = document.getElementsByClassName("leaflet-marker-icon");
  for (let i = 0; i < markerIcons.length; i++) {
    markerIcons[i].setAttribute("aria-disabled", "true");
    markerIcons[i].removeAttribute("tabindex");
  }
}

export class IndoorLayer {
  private readonly indoorLayerGroup: LayerGroup;

  constructor(geoJSON: GeoJSON.FeatureCollection) {
    IndoorLayer.removeAccessibilityMarkers();

    this.indoorLayerGroup = new LayerGroup();
    this.indoorLayerGroup.addTo(Map.get());
    this.drawIndoorLayerByGeoJSON(geoJSON);
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
      style: getFeatureStyle,
      onEachFeature: IndoorLayer.onEachFeature,
      pointToLayer: () => null,
    });
    this.indoorLayerGroup.addLayer(layer);
    featureScreenAccessibility();
  }

  private static onEachFeature(
    feature: GeoJSON.Feature<any, any>,
    layer?: Layer
  ) {
    const marker = getAccessibilityMarker(feature);
    if (marker) {
      marker.addTo(Map.get());
      accessibilityMarkers.push(marker);

      marker.on("click", (e: LeafletMouseEvent) => {
        layer.fire("click");
      });
    }

    layer.on("click", (e: LeafletMouseEvent) => {
      IndoorLayer.clickOnFeature(e);
    });
  }

  private static clickOnFeature(e: LeafletMouseEvent) {
    const { feature, _path } = e.sourceTarget;

    const accessibilityDescription = getAccessibilityDescription(feature);
    DescriptionArea.update(accessibilityDescription);
    highlightSelectedFeature(<HTMLElement>_path);
  }

  private static removeAccessibilityMarkers() {
    for (let i = 0; i < accessibilityMarkers.length; i++) {
      Map.get().removeLayer(accessibilityMarkers[i]);
    }
    accessibilityMarkers = [];
  }
}
