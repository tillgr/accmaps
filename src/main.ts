import { leafletMap, showBuilding } from "./components/leafletMap";
import { HttpService } from "./services/httpService";
import { LoadingIndicator } from "./components/ui/loadingIndicator";
import { DEFAULT_BUILDING_SEARCH_STRING } from "./services/data/constants";

document.addEventListener("DOMContentLoaded", function () {
  LoadingIndicator.start();
  leafletMap.get();
});

HttpService.fetchOverpassData()
  .then(() => {
    const buildingSearchString =
      localStorage.getItem("currentBuildingSearchString") ??
      DEFAULT_BUILDING_SEARCH_STRING;
    //TODO needs to move to map component
    showBuilding(buildingSearchString)
      .then(() => LoadingIndicator.end())
      .catch((error) => LoadingIndicator.error(error));
  })
  .catch((error) => {
    LoadingIndicator.error(error);
  });
