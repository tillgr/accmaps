import { LoadingIndicator } from "./loadingIndicator";
import { BuildingService } from "../../services/buildingService";

export function handleSearchForm(): void {
  const buildingSearchSubmit = document.getElementById("buildingSearchSubmit");
  const buildingSearchInput = document.getElementById("buildingSearch");

  buildingSearchSubmit.addEventListener("click", () => {
    runBuildingSearch(<HTMLInputElement>buildingSearchInput);
  });

  buildingSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runBuildingSearch(<HTMLInputElement>buildingSearchInput);
    }
  });
}

//TODO muss in den map component
function runBuildingSearch(buildingSearchInput: HTMLInputElement) {
  LoadingIndicator.start();
  const searchString = buildingSearchInput.value;

  BuildingService.searchAndShowBuilding(searchString)
    .then(() => {
      LoadingIndicator.end();
      const navBar = document.getElementById("navbarSupportedContent");
      navBar.classList.remove("show");
      navBar.classList.add("hide");
    })
    .catch((errorMessage) => {
      LoadingIndicator.error(errorMessage);
    });
}
