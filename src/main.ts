import {Map} from "./map";
import {OverpassData} from "./overpassData";
import {LoadingIndicator} from "./ui/_loadingIndicator";
import {BuildingControl} from "./buildingControl";
import {DEFAULT_BUILDING_SEARCH_STRING} from "./data/constants";

document.addEventListener('DOMContentLoaded', function () {
    LoadingIndicator.start()
    Map.get();
});

OverpassData.fetchOverpassData().then(() => {
    const buildingSearchString = localStorage.getItem('currentBuildingSearchString') ?? DEFAULT_BUILDING_SEARCH_STRING;
    BuildingControl.searchAndShowBuilding(buildingSearchString).then(() => LoadingIndicator.end()).catch(error => LoadingIndicator.error(error));
}).catch((error) => {
    LoadingIndicator.error(error);
});
