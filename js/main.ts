import {Map} from "./_map";
import {OverpassData} from "./_overpassData";
import {BuildingControl} from "./_buildingControl";
import {LevelControl} from "./_levelControl";
import {LoadingIndicator} from "./_loadingIndicator";

document.addEventListener('DOMContentLoaded', function () {
    LoadingIndicator.start()
    Map.getMap();

    OverpassData.fetchOverpassData().then(() => {
        LoadingIndicator.end()
        LevelControl.create();
    }).catch((error) => {
        LoadingIndicator.error();
    });

    handleSearchForm();
});

function handleSearchForm() {
    const buildingSearchSubmit = document.getElementById('buildingSearchSubmit');
    const buildingSearch = document.getElementById('buildingSearch');

    buildingSearchSubmit.addEventListener('click', BuildingControl.searchForBuilding);
    buildingSearch.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            BuildingControl.searchForBuilding();
        }
    })
}
