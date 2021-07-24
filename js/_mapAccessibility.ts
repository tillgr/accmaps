export function mapAccessibility() {
    removeShadowPane();
    silenceTileImages();
    silenceMapMarkers();
    silenceLeafletAttribution();
}

function removeShadowPane() {
    const leafletShadows = document.getElementsByClassName('leaflet-shadow-pane');

    [].forEach.call(leafletShadows, (shadow: Element) => {
        shadow.setAttribute('aria-hidden', 'true');
    });
}

function silenceTileImages() {
    const mapTiles = document.querySelectorAll('.leaflet-tile-container img, .leaflet-shadow-pane img');

    [].forEach.call(mapTiles, (tile: Element) => {
        tile.setAttribute('role', 'presentation');
        tile.setAttribute('aria-hidden', 'true'); // dont read them out
    });
}

function silenceMapMarkers() {
    const leafletMarkers = document.getElementsByClassName('leaflet-clickable');

    [].forEach.call(leafletMarkers, (marker: Element) => {
        marker.setAttribute('role', 'button');
    });
}

function silenceLeafletAttribution() {
    document.getElementsByClassName('leaflet-control-attribution')[0].setAttribute('aria-disabled', 'true');
}
