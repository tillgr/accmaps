import * as L from "leaflet";
import { GeoJSON, Layer, LayerGroup, LeafletMouseEvent, Marker } from "leaflet";
import { DescriptionArea } from "./ui/descriptionArea";

import { highlightSelectedFeature } from "../utils/highlightSelectedFeature";
import {
  getAccessibilityDescription,
  getAccessibilityMarker,
  getFeatureStyle,
} from "../services/featureService";
import { geoMap } from "../main";

//TODO move into class
/*let accessibilityMarkers: Marker[] = [];*/

export class IndoorLayer {
  private readonly indoorLayerGroup: LayerGroup;
  accessibilityMarkers: Marker[] = [];

  constructor(geoJSON: GeoJSON.FeatureCollection) {
    this.removeAccessibilityMarkers();

    this.indoorLayerGroup = new LayerGroup();
    this.drawIndoorLayerByGeoJSON(geoJSON);
    geoMap.add(this.indoorLayerGroup);
  }

  removeIndoorLayerFromMap(): void {
    geoMap.remove(this.indoorLayerGroup);
  }

  clearIndoorLayer(): void {
    this.indoorLayerGroup.clearLayers();
  }

  updateLayer(geoJSON: GeoJSON.FeatureCollection): void {
    this.clearIndoorLayer();
    this.drawIndoorLayerByGeoJSON(geoJSON);
  }

  private drawIndoorLayerByGeoJSON(geoJSON: GeoJSON.FeatureCollection) {
    this.removeAccessibilityMarkers();

    const layer = new L.GeoJSON(geoJSON, {
      style: getFeatureStyle,
      onEachFeature: this.onEachFeature,
      pointToLayer: () => null,
    });
    this.indoorLayerGroup.addLayer(layer);
    this.makeFeaturesAccessible();
  }

  private onEachFeature = (
    feature: GeoJSON.Feature<any, any>,
    layer?: Layer
  ) => {
    const marker = getAccessibilityMarker(feature);
    if (marker) {
      geoMap.add(marker);
      this.accessibilityMarkers.push(marker);

      marker.on("click", () => {
        layer.fire("click");
      });
    }

    layer.on("click", (e: LeafletMouseEvent) => {
      this.clickOnFeature(e);
    });
  };

  private clickOnFeature = (e: LeafletMouseEvent) => {
    const { feature, _path } = e.sourceTarget;

    const accessibilityDescription = getAccessibilityDescription(feature);
    DescriptionArea.update(accessibilityDescription);
    highlightSelectedFeature(<HTMLElement>_path);
  };

  private removeAccessibilityMarkers = () => {
    for (let i = 0; i < this.accessibilityMarkers.length; i++) {
      geoMap.remove(this.accessibilityMarkers[i]);
    }
    this.accessibilityMarkers = [];
  };

  makeFeaturesAccessible(): void {
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
}
