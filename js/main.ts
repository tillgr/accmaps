import {Map} from "./map";
import {OverpassData} from "./overpassData";
import {LevelControl} from "./levelControl";
import {LoadingIndicator} from "./ui/_loadingIndicator";

document.addEventListener('DOMContentLoaded', function () {
    LoadingIndicator.start()
    Map.get();

    OverpassData.fetchOverpassData().then(() => {
        LoadingIndicator.end()
        LevelControl.create();
    }).catch((error) => {
        LoadingIndicator.error(error);
    });
});
