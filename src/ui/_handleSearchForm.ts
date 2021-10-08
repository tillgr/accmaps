import {BuildingControl} from "../buildingControl";
import {LoadingIndicator} from "./_loadingIndicator";

export function handleSearchForm(): void {
    const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');
    const buildingSearchInput = document.getElementById('buildingSearch');

    buildingSearchSubmit.addEventListener('click', () => {
        runBuildingSearch(<HTMLInputElement>buildingSearchInput);
    });

    buildingSearchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            runBuildingSearch(<HTMLInputElement>buildingSearchInput);
        }
    });
}

function runBuildingSearch(buildingSearchInput: HTMLInputElement) {
    LoadingIndicator.start();
    const searchString = buildingSearchInput.value;

    BuildingControl.searchAndShowBuilding(searchString).then(() => {
        LoadingIndicator.end()
    }).catch((errorMessage) => {
        LoadingIndicator.error(errorMessage);
    });
}
