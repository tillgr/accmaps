export function featureScreenAccessibility(): void {
    const featurePaths = document.getElementsByClassName('leaflet-interactive');
    for (let i = 0; i < featurePaths.length; i++) {
        featurePaths[i].setAttribute('aria-disabled', 'true');
    }

    const markerIcons = document.getElementsByClassName('leaflet-marker-icon');
    for (let i = 0; i < markerIcons.length; i++) {
        markerIcons[i].setAttribute('aria-disabled', 'true');
        markerIcons[i].removeAttribute('tabindex');
    }
}
