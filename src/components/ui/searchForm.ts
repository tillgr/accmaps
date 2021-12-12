import { runBuildingSearch } from "../leafletMap";

export function handleChange(): void {
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
