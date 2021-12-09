import { LatLng, Map as LeafletMap, TileLayer } from "leaflet";

import {
  MAP_START_LAT,
  MAP_START_LNG,
  OSM_ATTRIBUTION,
  OSM_TILE_SERVER,
} from "../services/data/constants";

let mapInstance: LeafletMap = null;

export const Map = {
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
    removeShadowPane();
    silenceTileImages();
    silenceMapMarkers();
    silenceLeafletAttribution();
    silenceZoomControls();
    //TODO simplify, since all functions use the same logic
  },
};

function removeShadowPane() {
  const leafletShadows = document.getElementsByClassName("leaflet-shadow-pane");

  [].forEach.call(leafletShadows, (shadow: Element) => {
    shadow.setAttribute("aria-hidden", "true");
  });
}

function silenceZoomControls() {
  const controls = document.getElementsByClassName("leaflet-control-zoom");
  [].forEach.call(controls, (contol: Element) => {
    contol.setAttribute("role", "presentation");
    contol.setAttribute("aria-hidden", "true"); // dont read them out
  });
}

function silenceTileImages() {
  const mapTiles = document.getElementsByClassName("leaflet-tile");

  [].forEach.call(mapTiles, (tile: Element) => {
    tile.setAttribute("role", "presentation");
    tile.setAttribute("aria-hidden", "true"); // dont read them out
  });
}

function silenceMapMarkers() {
  const leafletMarkers = document.getElementsByClassName("leaflet-clickable");

  [].forEach.call(leafletMarkers, (marker: Element) => {
    marker.setAttribute("role", "button");
  });
}

function silenceLeafletAttribution() {
  document
    .getElementsByClassName("leaflet-control-attribution")[0]
    .setAttribute("aria-hidden", "true");
}
