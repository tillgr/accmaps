import { GeoMap } from "./components/geoMap";
import HttpService from "./services/httpService";
import { translate } from "./utils/translate";
import LoadingIndicator from "./components/ui/loadingIndicator";
import Legend from "./components/ui/legend";
import CenterBtn from "./components/ui/centeringButton";
import { DEFAULT_BUILDING_SEARCH_STRING } from "../public/strings/constants.json";
import searchForm from "./components/ui/searchForm";

export let geoMap: GeoMap = null;
document.addEventListener("DOMContentLoaded", function () {
  LoadingIndicator.start();

  HttpService.fetchOverpassData()
    .then(() => {
      geoMap = new GeoMap();
      const buildingSearchString =
        localStorage.getItem("currentBuildingSearchString") ??
        DEFAULT_BUILDING_SEARCH_STRING;
      geoMap.runBuildingSearch(buildingSearchString);
      searchForm.setBuildingSearchInput(buildingSearchString);
      Legend.create();
      CenterBtn.create();
      translate();
    })
    .catch((error) => {
      LoadingIndicator.error(error);
    });
});
