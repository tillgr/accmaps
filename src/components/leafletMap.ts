import { LatLng, LatLngBounds, Map as LeafletMap, TileLayer } from "leaflet";

import {
  MAP_START_LAT,
  MAP_START_LNG,
  OSM_ATTRIBUTION,
  OSM_TILE_SERVER,
} from "../services/data/constants";
import { BuildingInterface } from "../models/buildingInterface";
import { reCreate } from "./ui/levelControl";
import { DescriptionArea } from "./ui/descriptionArea";
import { BuildingService, handleSearch } from "../services/buildingService";
import { LoadingIndicator } from "./ui/loadingIndicator";

let mapInstance: LeafletMap = null;

//TODO maybe propagate to class component in the future
export const leafletMap = {
  get(): LeafletMap {
    if (mapInstance === null) {
      mapInstance = this.createMap();
    }

    return mapInstance;
  },

  createMap(): LeafletMap {
    const osmTileLayer = new TileLayer(OSM_TILE_SERVER, {
      maxZoom: 21,
      attribution: OSM_ATTRIBUTION,
    });

    mapInstance = new LeafletMap("map", {
      center: new LatLng(MAP_START_LAT, MAP_START_LNG),
      zoom: 19,
    })
      .on("moveend", this.makeAccessible)
      .on("load", this.makeAccessible)
      .on("zoomend", this.makeAccessible);
    mapInstance.whenReady(this.makeAccessible);

    osmTileLayer.addTo(mapInstance);
    return mapInstance;
  },

  makeAccessible(): void {
    leafletMap.removeShadowPane();
    leafletMap.silenceTileImages();
    leafletMap.silenceMapMarkers();
    leafletMap.silenceLeafletAttribution();
    leafletMap.silenceZoomControls();
    //TODO simplify, since all functions use the same logic
  },

  removeShadowPane(): void {
    const leafletShadows = document.getElementsByClassName(
      "leaflet-shadow-pane"
    );

    [].forEach.call(leafletShadows, (shadow: Element) => {
      shadow.setAttribute("aria-hidden", "true");
    });
  },

  silenceZoomControls(): void {
    const controls = document.getElementsByClassName("leaflet-control-zoom");
    [].forEach.call(controls, (contol: Element) => {
      contol.setAttribute("role", "presentation");
      contol.setAttribute("aria-hidden", "true"); // dont read them out
    });
  },

  silenceTileImages(): void {
    const mapTiles = document.getElementsByClassName("leaflet-tile");

    [].forEach.call(mapTiles, (tile: Element) => {
      tile.setAttribute("role", "presentation");
      tile.setAttribute("aria-hidden", "true"); // dont read them out
    });
  },

  silenceMapMarkers(): void {
    const leafletMarkers = document.getElementsByClassName("leaflet-clickable");

    [].forEach.call(leafletMarkers, (marker: Element) => {
      marker.setAttribute("role", "button");
    });
  },

  silenceLeafletAttribution(): void {
    document
      .getElementsByClassName("leaflet-control-attribution")[0]
      .setAttribute("aria-hidden", "true");
  },
};

export let currentSearchString = "";
export const buildingsBySearchString: Map<string, BuildingInterface> = new Map<
  string,
  BuildingInterface
>();

export function showBuilding(searchString: string): Promise<string> {
  //searchAndShowBuilding

  return handleSearch(searchString).then((b: BuildingInterface) => {
    buildingsBySearchString.set(searchString, b);
    currentSearchString = searchString;
    localStorage.setItem("currentBuildingSearchString", searchString);

    handleBuildingChange();
    centerMapToBuilding();

    //TODO create method: handleBuildingChange
    /* const message = BuildingService.getBuildingDescription();
    DescriptionArea.update(message);*/

    reCreate();

    return new Promise((resolve) => resolve("Building found."));
  });
}

export function handleBuildingChange(): void {
  const message = BuildingService.getBuildingDescription();
  DescriptionArea.update(message);
}

export function centerMapToBuilding(): void {
  const currentBuildingBBox =
    buildingsBySearchString.get(currentSearchString).boundingBox;

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

    console.log(currentBuildingBBox_corrected);

    leafletMap.get().flyToBounds(currentBuildingBBox_corrected);
  }
}

export function runBuildingSearch(buildingSearchInput: HTMLInputElement): void {
  LoadingIndicator.start();
  const searchString = buildingSearchInput.value;

  showBuilding(searchString)
    .then(() => {
      LoadingIndicator.end();
      const navBar = document.getElementById("navbarSupportedContent");
      navBar.classList.remove("show");
      navBar.classList.add("hide");
    })
    .catch((errorMessage) => {
      LoadingIndicator.error(errorMessage);
    });
}
