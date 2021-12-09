import { GeoJSON, LatLng, LatLngBounds } from "leaflet";

import { OverpassData } from "../overpassData";
import { LevelService } from "../levelService";
import { DescriptionArea } from "../../components/ui/descriptionArea";

import { filterGeoJsonDataByBuildingBBox } from "./_filterGeoJsonDataByBuildingBBox";
import { getBuildingDescription } from "./_getBuildingDescription";
import { buildingSearch } from "./_buildingSearch";
import { BuildingInterface } from "../../models/buildingInterface";
import { Map as M } from "../../components/map";

const buildingsBySearchString: Map<string, BuildingInterface> = new Map<
  string,
  BuildingInterface
>();
let currentSearchString = "";

export const BuildingControl = {
  getBuildingGeoJSON(): GeoJSON.FeatureCollection<any> {
    const buildingInterface = buildingsBySearchString.get(currentSearchString);
    if (buildingInterface !== undefined) {
      return filterGeoJsonDataByBuildingBBox(
        OverpassData.getIndoorData(),
        buildingInterface.boundingBox
      );
    }

    console.error("Building not found");
    return null;
  },

  getBuildingDescription(): string {
    const currentBuildingFeature =
      buildingsBySearchString.get(currentSearchString).feature;
    return getBuildingDescription(currentBuildingFeature);
  },

  searchAndShowBuilding(searchString: string): Promise<string> {
    return buildingSearch(searchString).then((b: BuildingInterface) => {
      buildingsBySearchString.set(searchString, b);
      currentSearchString = searchString;
      localStorage.setItem("currentBuildingSearchString", searchString);

      LevelService.reCreate();
      DescriptionArea.update(BuildingControl.getBuildingDescription());

      BuildingControl.centerMapToBuilding();

      return new Promise((resolve) => resolve("Building found."));
    });
  },

  centerMapToBuilding(): void {
    const currentBuildingBBox =
      buildingsBySearchString.get(currentSearchString).boundingBox;

    if (currentBuildingBBox !== null) {
      /* seems to be a bug somewhere (in leaflet?):
       * elements of returned bounding box are in wrong order (Lat and Lng are interchanged) */

      const currentBuildingBBox_corrected = new LatLngBounds(
        new LatLng(
          currentBuildingBBox.getSouthWest().lng,
          currentBuildingBBox.getSouthWest().lat
        ),
        new LatLng(
          currentBuildingBBox.getNorthEast().lng,
          currentBuildingBBox.getNorthEast().lat
        )
      );

      M.get().flyToBounds(currentBuildingBBox_corrected);
    }
  },
};
