import { GeoMap } from "./components/geoMap";
import { HttpService } from "./services/httpService";
import { LoadingIndicator } from "./components/ui/loadingIndicator";
import { DEFAULT_BUILDING_SEARCH_STRING } from "./data/constants";

export let geoMap: GeoMap = null;
document.addEventListener("DOMContentLoaded", function () {
  LoadingIndicator.start();

  HttpService.fetchOverpassData()
    .then(() => {
      geoMap = new GeoMap();
      const buildingSearchString =
        localStorage.getItem("currentBuildingSearchString") ??
        DEFAULT_BUILDING_SEARCH_STRING;
      geoMap
        .showBuilding(buildingSearchString)
        .then(() => LoadingIndicator.end())
        .catch((error) => LoadingIndicator.error(error));
    })
    .catch((error) => {
      LoadingIndicator.error(error);
    });
});
