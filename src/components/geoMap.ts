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

export class GeoMap {
  currentSearchString = "";
  buildingsBySearchString = new Map<string, BuildingInterface>();

  mapInstance: LeafletMap = null;

  constructor() {
    this.createMap();
  }

  get(): LeafletMap {
    if (this.mapInstance === null) {
      this.mapInstance = this.createMap();
    }

    return this.mapInstance;
  }

  createMap(): LeafletMap {
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

    osmTileLayer.addTo(this.mapInstance);
    return this.mapInstance;
  }

  makeAccessible = (): void => {
    this.removeShadowPane();
    this.silenceTileImages();
    this.silenceMapMarkers();
    this.silenceLeafletAttribution();
    this.silenceZoomControls();
    //TODO simplify, since all functions use the same logic
  };

  removeShadowPane(): void {
    const leafletShadows = document.getElementsByClassName(
      "leaflet-shadow-pane"
    );

    [].forEach.call(leafletShadows, (shadow: Element) => {
      shadow.setAttribute("aria-hidden", "true");
    });
  }

  silenceZoomControls(): void {
    const controls = document.getElementsByClassName("leaflet-control-zoom");
    [].forEach.call(controls, (contol: Element) => {
      contol.setAttribute("role", "presentation");
      contol.setAttribute("aria-hidden", "true"); // dont read them out
    });
  }

  silenceTileImages(): void {
    const mapTiles = document.getElementsByClassName("leaflet-tile");

    [].forEach.call(mapTiles, (tile: Element) => {
      tile.setAttribute("role", "presentation");
      tile.setAttribute("aria-hidden", "true"); // dont read them out
    });
  }

  silenceMapMarkers(): void {
    const leafletMarkers = document.getElementsByClassName("leaflet-clickable");

    [].forEach.call(leafletMarkers, (marker: Element) => {
      marker.setAttribute("role", "button");
    });
  }

  silenceLeafletAttribution(): void {
    document
      .getElementsByClassName("leaflet-control-attribution")[0]
      .setAttribute("aria-hidden", "true");
  }

  showBuilding(searchString: string): Promise<string> {
    //searchAndShowBuilding

    return handleSearch(searchString).then((b: BuildingInterface) => {
      this.buildingsBySearchString.set(searchString, b);
      this.currentSearchString = searchString;
      localStorage.setItem("currentBuildingSearchString", searchString);

      this.handleBuildingChange();
      this.centerMapToBuilding();

      reCreate();

      return new Promise((resolve) => resolve("Building found."));
    });
  }

  handleBuildingChange(): void {
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

      this.get().flyToBounds(currentBuildingBBox_corrected);
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
}

//TODO maybe propagate to class component in the future
/*export const geoMap = {
  currentSearchString: "",
  buildingsBySearchString: new Map<string, BuildingInterface>(),

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
    geoMap.removeShadowPane();
    geoMap.silenceTileImages();
    geoMap.silenceMapMarkers();
    geoMap.silenceLeafletAttribution();
    geoMap.silenceZoomControls();
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

  showBuilding(searchString: string): Promise<string> {
    //searchAndShowBuilding

    return handleSearch(searchString).then((b: BuildingInterface) => {
      this.buildingsBySearchString.set(searchString, b);
      this.currentSearchString = searchString;
      localStorage.setItem("currentBuildingSearchString", searchString);

      this.handleBuildingChange();
      this.centerMapToBuilding();

      reCreate();

      return new Promise((resolve) => resolve("Building found."));
    });
  },

  handleBuildingChange(): void {
    const message = BuildingService.getBuildingDescription();
    DescriptionArea.update(message);
  },

  centerMapToBuilding(): void {
    const currentBuildingBBox = this.buildingsBySearchString.get(
      this.currentSearchString
    ).boundingBox;

    if (currentBuildingBBox !== null) {
      /!* seems to be a bug somewhere (in leaflet?):
       * elements of returned bounding box are in wrong order (Lat and Lng are interchanged) *!/

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

      this.get().flyToBounds(currentBuildingBBox_corrected);
    }
  },

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
  },
};*/
