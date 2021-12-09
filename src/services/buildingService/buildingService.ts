import { BuildingInterface } from "../../models/buildingInterface";
import { OverpassData } from "../overpassData";
import { GeoJSON, LatLng, LatLngBounds } from "leaflet";
import { MAPQUEST_API_KEY, NOMINATIM_SERVER } from "../data/constants";
import { LevelService } from "../levelService";
import { DescriptionArea } from "../../components/ui/descriptionArea";
import { Map as M } from "../../components/map";
import { featureDescriptionHelper } from "../../utils/featureDescriptionHelper";
import { buildingAccessibilityProperties } from "../data/buildingAccessibilityProperties";
import { GeoJsonObject, Position } from "geojson";
import { getArrayDepth } from "../../utils/getArrayDepth";

const toBBox = require("geojson-bounding-box");

/**
 * Finding a building by search string:
 * 1) Iterate through all building Features if there is a Feature with the given name. If so, return the building Feature.
 * 2) Otherwise, call Nominatim service to do a more advanced search. Since Nominatim does not return a GeoJSON Feature,
 *    we have to again iterate through all building Features to find the id returned by Nominatim.
 */
export function buildingSearch(
  searchString: string
): Promise<BuildingInterface> {
  let returnBuilding: BuildingInterface;

  const buildings = OverpassData.getBuildingData();
  const found = buildings.features.some(
    (building: GeoJSON.Feature<any, any>) => {
      if (
        (building.properties.name !== undefined &&
          building.properties.name === searchString) ||
        (building.properties.loc_ref !== undefined &&
          building.properties.loc_ref === searchString)
      ) {
        const BBox = toBBox(building);
        returnBuilding = {
          boundingBox: new LatLngBounds(
            new LatLng(BBox[2], BBox[3]),
            new LatLng(BBox[0], BBox[1])
          ),
          feature: building,
        };
        return true;
      }
      return false;
    }
  );

  if (found) {
    return new Promise((resolve) => {
      resolve(returnBuilding);
    });
  }

  return nominatimSearch(searchString);
}

function nominatimSearch(searchString: string): Promise<BuildingInterface> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const nominatimResponse = JSON.parse(xhr.responseText);
          if (
            nominatimResponse.length === 0 ||
            nominatimResponse[0] === undefined
          ) {
            return reject("Building could not be found");
          }

          const BBox = nominatimResponse[0]["boundingbox"];
          const buildingFeature = findBuildingFeatureInDataset(
            nominatimResponse[0]["osm_type"] +
              "/" +
              nominatimResponse[0]["osm_id"]
          );

          if (buildingFeature === null) {
            return reject(
              "Building was found, but is not in the dataset of SIT-conform buildings"
            );
          }

          if (BBox !== undefined) {
            const returnBuilding = {
              boundingBox: new LatLngBounds(
                new LatLng(BBox[2], BBox[3]),
                new LatLng(BBox[0], BBox[1])
              ),
              feature: buildingFeature,
            };
            return resolve(returnBuilding);
          }

          return reject(null);
        } else if (xhr.status > 400) {
          return reject(null);
        }
      }
    };

    xhr.open(
      "GET",
      NOMINATIM_SERVER +
        "?key= " +
        MAPQUEST_API_KEY +
        "&format=json&q=" +
        encodeURIComponent(searchString) +
        "&addressdetails=0&limit=1",
      true
    );
    xhr.send();
  });
}

function findBuildingFeatureInDataset(
  featureId: string
): GeoJSON.Feature<any, any> {
  const buildings = OverpassData.getBuildingData();
  let foundBuilding: GeoJSON.Feature<any, any> = null;

  buildings.features.some((b) => {
    if (b.id === featureId) {
      foundBuilding = b;
      return true;
    }
    return false;
  });

  return foundBuilding;
}

const buildingsBySearchString: Map<string, BuildingInterface> = new Map<
  string,
  BuildingInterface
>();
let currentSearchString = "";

//TODO propagate to class
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

export function getBuildingDescription(
  currentBuildingFeature: GeoJSON.Feature
): string {
  let description = "";

  if (currentBuildingFeature.properties.name !== undefined) {
    description +=
      "Current building: " + currentBuildingFeature.properties.name;

    if (currentBuildingFeature.properties.loc_ref !== undefined) {
      description += " (" + currentBuildingFeature.properties.loc_ref + ")";
    }
  }

  description += featureDescriptionHelper(
    currentBuildingFeature,
    buildingAccessibilityProperties
  );

  return description;
}

export function filterGeoJsonDataByBuildingBBox(
  geoJSON: GeoJsonObject,
  buildingBBox: LatLngBounds
): GeoJSON.FeatureCollection<any> {
  const featureCollection = <GeoJSON.FeatureCollection<any>>geoJSON;

  if (buildingBBox === null) {
    return null;
  }

  const filteredFeatures = featureCollection.features.filter((f) =>
    isFeatureValidAndInsideCurrentBuilding(f, buildingBBox)
  );

  //create a new object to avoid to original GeoJSON object to be modified
  return {
    type: "FeatureCollection",
    features: filteredFeatures,
  } as GeoJSON.FeatureCollection<any>;
}

function isFeatureValidAndInsideCurrentBuilding(
  feature: GeoJSON.Feature<any>,
  buildingBBox: LatLngBounds
) {
  if (
    feature.properties === undefined ||
    feature.properties.level === undefined
  ) {
    return false;
  }

  return isFeatureInsideCurrentBuilding(
    feature.geometry.coordinates,
    buildingBBox
  );
}

function isFeatureInsideCurrentBuilding(
  featureCoordinates: Position[][] | Position[] | Position,
  buildingBBox: LatLngBounds
): boolean {
  switch (getArrayDepth(featureCoordinates)) {
    case 1: {
      featureCoordinates = <Position>featureCoordinates;
      const latLng = new LatLng(featureCoordinates[0], featureCoordinates[1]);
      return buildingBBox.contains(latLng);
    }
    case 2: {
      featureCoordinates = <Position[]>featureCoordinates;
      return featureCoordinates.some((fc: Position) => {
        const latLng = new LatLng(fc[0], fc[1]);
        return buildingBBox.contains(latLng);
      });
    }
    case 3: {
      featureCoordinates = <Position[][]>featureCoordinates;
      return featureCoordinates.some((fc: Position[]) => {
        return fc.some((fc2: Position) => {
          const latLng = new LatLng(fc2[0], fc2[1]);
          return buildingBBox.contains(latLng);
        });
      });
    }
  }
}
