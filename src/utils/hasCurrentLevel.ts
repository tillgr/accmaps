import { GeoJSON } from "leaflet";
import { getCurrentLevel } from "../components/ui/levelControl";

export function hasCurrentLevel(feature: GeoJSON.Feature<any>): boolean {
  const currentLevel = getCurrentLevel();
  return (
    feature.properties.level === currentLevel ||
    feature.properties.level.includes(currentLevel)
  );
}
