import { Map } from "./components/map";
import { HttpService } from "./services/httpService";
import { LoadingIndicator } from "./components/ui/loadingIndicator";
import { DEFAULT_BUILDING_SEARCH_STRING } from "./services/data/constants";
import { BuildingService } from "./services/buildingService";

document.addEventListener("DOMContentLoaded", function () {
  LoadingIndicator.start();
  Map.get();
});

HttpService.fetchOverpassData()
  .then(() => {
    const buildingSearchString =
      localStorage.getItem("currentBuildingSearchString") ??
      DEFAULT_BUILDING_SEARCH_STRING;
    //TODO muss von map ausgeführt werden
    BuildingService.searchAndShowBuilding(buildingSearchString)
      .then(() => LoadingIndicator.end())
      .catch((error) => LoadingIndicator.error(error));
  })
  .catch((error) => {
    LoadingIndicator.error(error);
  });
