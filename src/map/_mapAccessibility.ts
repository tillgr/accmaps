export function mapAccessibility(): void {
    removeShadowPane();
    silenceTileImages();
    silenceMapMarkers();
    silenceLeafletAttribution();
    silenceZoomControls();
    //TODO: simplify, since all functions use the same logic
}

function removeShadowPane() {
    const leafletShadows = document.getElementsByClassName('leaflet-shadow-pane');

    [].forEach.call(leafletShadows, (shadow: Element) => {
        shadow.setAttribute('aria-hidden', 'true');
    });
}

function silenceZoomControls() {
    const controls = document.getElementsByClassName('leaflet-control-zoom');
    [].forEach.call(controls, (contol: Element) => {
        contol.setAttribute('role', 'presentation');
        contol.setAttribute('aria-hidden', 'true'); // dont read them out
    });
}

function silenceTileImages() {
    const mapTiles = document.getElementsByClassName('leaflet-tile');

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
    document.getElementsByClassName('leaflet-control-attribution')[0].setAttribute('aria-hidden', 'true');
}
