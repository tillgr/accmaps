import {Map} from "./components/map";
import {OverpassData} from "./services/overpassData";
import {LoadingIndicator} from "./ui/_loadingIndicator";
import {BuildingControl} from "./services/buildingControl";
import {DEFAULT_BUILDING_SEARCH_STRING} from "./services/data/constants";

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
