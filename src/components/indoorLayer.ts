import * as L from "leaflet";
import { GeoJSON, Layer, LayerGroup, LeafletMouseEvent, Marker } from "leaflet";
import DescriptionArea from "./ui/descriptionArea";
import FeatureService from "../services/featureService";
import LevelService from "../services/levelService";
import { geoMap } from "../main";
import { COLORS } from "../data/constants.json";

export class IndoorLayer {
  private readonly indoorLayerGroup: LayerGroup;
  selectedFeatures: GeoJSON.Feature[] = [];
  layerInstance: Layer;

  constructor(geoJSON: GeoJSON.FeatureCollection) {
    console.log(geoMap.accessibilityMarkers);
    geoMap.removeAccessibilityMarkers();

    this.indoorLayerGroup = new LayerGroup();
    this.drawIndoorLayerByGeoJSON(geoJSON);
    this.layerInstance = geoMap.add(this.indoorLayerGroup);
  }

  clearIndoorLayer(): void {
    this.indoorLayerGroup.clearLayers();
  }

  updateLayer(): void {
    this.clearIndoorLayer();
    this.drawIndoorLayerByGeoJSON(LevelService.getCurrentLevelGeoJSON());
  }

  private drawIndoorLayerByGeoJSON(geoJSON: GeoJSON.FeatureCollection) {
    geoMap.removeAccessibilityMarkers();

    const layer = new L.GeoJSON(geoJSON, {
      style: FeatureService.getFeatureStyle,
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
    this.addMarker(feature, layer);
    this.showRoomNumber(feature, layer);
    this.selectFeature(feature, layer);
  };

  private addMarker = (
    feature: GeoJSON.Feature<any, any>,
    layer: Layer
  ): void => {
    const marker = FeatureService.getAccessibilityMarker(feature);
    if (marker) {
      geoMap.add(marker);
      geoMap.accessibilityMarkers.push(marker);

      marker.on("click", () => {
        layer.fire("click");
      });
    }

    layer.on("click", (e: LeafletMouseEvent) => {
      this.handleClick(e);
    });
  };

  private showRoomNumber(
    feature: GeoJSON.Feature<any, any>,
    layer: Layer
  ): void {
    const {
      indoor,
      stairs,
      ref: roomNo,
      handrail,
      amenity,
    } = feature.properties;

    //only rooms; no toilets/..
    if (roomNo && indoor == "room" && !amenity && !handrail && !stairs) {
      layer.bindTooltip(roomNo, {
        permanent: true,
        className: "room-label",
        offset: [0, 0],
        direction: "center",
      });
    }
  }

  private handleClick = (e: LeafletMouseEvent) => {
    const { feature } = e.sourceTarget;

    const accessibilityDescription =
      FeatureService.getAccessibilityDescription(feature);
    DescriptionArea.update(accessibilityDescription);

    this.selectedFeatures = [feature];
    this.updateLayer();
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

  getIndoorLayerGroup(): LayerGroup {
    return this.indoorLayerGroup;
  }

  selectFeature(feature: GeoJSON.Feature<any, any>, layer: Layer): void {
    if (this.selectedFeatures.includes(feature)) {
      // @ts-ignore
      layer.options.fillColor = COLORS.ROOM_SELECTED;
    }
  }

  setSelectedFeatures(features: GeoJSON.Feature[]): void {
    this.selectedFeatures = features;
  }
}
