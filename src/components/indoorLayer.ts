import * as L from "leaflet";
import { GeoJSON, Layer, LayerGroup, LeafletMouseEvent, Marker } from "leaflet";

import { geoMap } from "./geoMap";
import { DescriptionArea } from "./ui/descriptionArea";

import { highlightSelectedFeature } from "../utils/highlightSelectedFeature";
import {
  getAccessibilityDescription,
  getAccessibilityMarker,
  getFeatureStyle,
} from "../services/featureService";

//TODO move into class
let accessibilityMarkers: Marker[] = [];

export function makeFeaturesAccessible(): void {
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
    this.indoorLayerGroup.addTo(geoMap.get());
    this.drawIndoorLayerByGeoJSON(geoJSON);
  }

  removeIndoorLayerFromMap(): void {
    geoMap.get().removeLayer(this.indoorLayerGroup);
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
    makeFeaturesAccessible();
  }

  private static onEachFeature(
    feature: GeoJSON.Feature<any, any>,
    layer?: Layer
  ) {
    const marker = getAccessibilityMarker(feature);
    if (marker) {
      marker.addTo(geoMap.get());
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
      geoMap.get().removeLayer(accessibilityMarkers[i]);
    }
    accessibilityMarkers = [];
  }
}
