export function featureScreenAccessibility(): void {
    const featurePaths = document.getElementsByClassName('leaflet-interactive');
    for (let i = 0; i < featurePaths.length; i++) {
        featurePaths[i].setAttribute('aria-disabled', 'true');
    }
}
