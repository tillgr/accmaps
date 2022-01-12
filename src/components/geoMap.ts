import {
  LatLng,
  LatLngBounds,
  LayerGroup,
  Map as LeafletMap,
  Marker,
  TileLayer,
} from "leaflet";

import {
  INDOOR_LEVEL,
  MAP_START_LAT,
  MAP_START_LNG,
  OSM_ATTRIBUTION,
  OSM_TILE_SERVER,
} from "../data/constants";
import { BuildingInterface } from "../models/buildingInterface";
import levelControl from "./ui/levelControl";
import DescriptionArea from "./ui/descriptionArea";
import BuildingService from "../services/buildingService";
import buildingService from "../services/buildingService";
import LoadingIndicator from "./ui/loadingIndicator";
import LevelService from "../services/levelService";
import { IndoorLayer } from "./indoorLayer";
import { geoMap } from "../main";
import AccessibilityService from "../services/accessibilityService";
import accessibility from "../utils/makeAccessible";
import FeatureService from "../services/featureService";
import levelService from "../services/levelService";

export class GeoMap {
  currentSearchString = "";
  buildingsBySearchString = new Map<string, BuildingInterface>();
  mapInstance: LeafletMap = null;
  currentLevel = INDOOR_LEVEL;
  indoorLayer: IndoorLayer;

  constructor() {
    const osmTileLayer = new TileLayer(OSM_TILE_SERVER, {
      maxZoom: 21,
      attribution: OSM_ATTRIBUTION,
    });

    this.mapInstance = new LeafletMap("map", {
      center: new LatLng(MAP_START_LAT, MAP_START_LNG),
      zoom: 19,
    })
      .on("moveend", this.makeAccessible)
      .on("load", this.makeAccessible)
      .on("zoomend", this.makeAccessible);

    this.mapInstance.whenReady(this.makeAccessible);
    this.add(osmTileLayer);
  }

  add(obj: LayerGroup | Marker | TileLayer): void {
    obj.addTo(this.mapInstance);
  }

  remove(layerGroup: LayerGroup | Marker): void {
    this.mapInstance.removeLayer(layerGroup);
  }

  removeIndoorLayerFromMap(): void {
    const group = this.indoorLayer.getIndoorLayerGroup();
    geoMap.remove(group);
  }

  makeAccessible(): void {
    accessibility.removeShadowPane();
    accessibility.silenceTileImages();
    accessibility.silenceMapMarkers();
    accessibility.silenceLeafletAttribution();
    accessibility.silenceZoomControls();
  }

  showBuilding(searchString: string): Promise<string> {
    //searchAndShowBuilding

    return buildingService
      .handleSearch(searchString)
      .then((b: BuildingInterface) => {
        this.buildingsBySearchString.set(searchString, b);
        this.currentSearchString = searchString;
        localStorage.setItem("currentBuildingSearchString", searchString);

        this.handleBuildingChange();
        this.centerMapToBuilding();

        return new Promise((resolve) => resolve("Building found."));
      });
  }

  handleBuildingChange(): void {
    levelControl.handleChange();
    this.indoorLayer = new IndoorLayer(LevelService.getCurrentLevelGeoJSON());

    AccessibilityService.reset();

    const message = BuildingService.getBuildingDescription();
    DescriptionArea.update(message);
  }

  centerMapToBuilding(): void {
    const currentBuildingBBox = this.buildingsBySearchString.get(
      this.currentSearchString
    ).boundingBox;

    if (currentBuildingBBox !== null) {
      /* seems to be a bug somewhere (in leaflet?):
       * elements of returned bounding box are in wrong order (Lat and Lng are interchanged) */

      const currentBuildingBBox_corrected = new LatLngBounds(
        new LatLng(
          currentBuildingBBox.getSouthWest().lng,
          currentBuildingBBox.getSouthWest().lat
        ),
        new LatLng(
          currentBuildingBBox.getNorthEast().lng,
          currentBuildingBBox.getNorthEast().lat
        )
      );

      this.mapInstance.flyToBounds(currentBuildingBBox_corrected);
    }
  }

  runBuildingSearch(buildingSearchInput: HTMLInputElement): void {
    LoadingIndicator.start();
    const searchString = buildingSearchInput.value;

    this.showBuilding(searchString)
      .then(() => {
        LoadingIndicator.end();
        const navBar = document.getElementById("navbarSupportedContent");
        navBar.classList.remove("show");
        navBar.classList.add("hide");
      })
      .catch((errorMessage: string) => {
        LoadingIndicator.error(errorMessage);
      });
  }

  handleLevelChange(newLevel: string): void {
    this.currentLevel = newLevel;
    this.indoorLayer.updateLayer();

    const message = LevelService.getCurrentLevelDescription();
    DescriptionArea.update(message);
  }

  getCurrentLevel(): string {
    return this.currentLevel;
  }

  handleIndoorSearch({ value: searchString }: HTMLInputElement): void {
    if (searchString) {
      const results = buildingService.runIndoorSearch(searchString);
      this.indoorLayer.selectedFeatures = results;

      const selectedLevel = results[0].properties.level.toString();
      levelControl.focusOnLevel(selectedLevel);

      this.handleLevelChange(selectedLevel);
    } else alert("not found!");
  }
}
