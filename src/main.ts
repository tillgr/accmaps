import { Map } from "./components/map/map";
import { OverpassData } from "./services/overpassData";
import { LoadingIndicator } from "./components/ui/loadingIndicator";
import { BuildingControl } from "./services/buildingService";
import { DEFAULT_BUILDING_SEARCH_STRING } from "./services/data/constants";

document.addEventListener("DOMContentLoaded", function () {
  LoadingIndicator.start();
  Map.get();
});

OverpassData.fetchOverpassData()
  .then(() => {
    const buildingSearchString =
      localStorage.getItem("currentBuildingSearchString") ??
      DEFAULT_BUILDING_SEARCH_STRING;
    BuildingControl.searchAndShowBuilding(buildingSearchString)
      .then(() => LoadingIndicator.end())
      .catch((error) => LoadingIndicator.error(error));
  })
  .catch((error) => {
    LoadingIndicator.error(error);
  });
