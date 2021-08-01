import {Map} from "./_map";
import {OverpassData} from "./_overpassData";
import {LevelControl} from "./_levelControl";
import {LoadingIndicator} from "./_loadingIndicator";

document.addEventListener('DOMContentLoaded', function () {
    LoadingIndicator.start()
    Map.get();

    OverpassData.fetchOverpassData().then(() => {
        LoadingIndicator.end()
        LevelControl.create();
    }).catch((error) => {
        LoadingIndicator.error();
    });
});
