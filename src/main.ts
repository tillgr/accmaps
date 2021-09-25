import {Map} from "./map";
import {OverpassData} from "./overpassData";
import {LoadingIndicator} from "./ui/_loadingIndicator";
import {BuildingControl} from "./buildingControl";

document.addEventListener('DOMContentLoaded', function () {
    LoadingIndicator.start()
    Map.get();
});

OverpassData.fetchOverpassData().then(() => {
    BuildingControl.searchAndShowBuilding('APB').then(() => LoadingIndicator.end()).catch(error => LoadingIndicator.error(error));
}).catch((error) => {
    LoadingIndicator.error(error);
});
