import { geoMap } from "./components/geoMap";
import { HttpService } from "./services/httpService";
import { LoadingIndicator } from "./components/ui/loadingIndicator";
import { DEFAULT_BUILDING_SEARCH_STRING } from "./services/data/constants";

document.addEventListener("DOMContentLoaded", function () {
  LoadingIndicator.start();
  geoMap.get();
});

HttpService.fetchOverpassData()
  .then(() => {
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
