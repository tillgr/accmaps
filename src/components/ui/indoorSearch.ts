import { geoMap } from "../../main";

function render(): void {
  const indoorSearchSubmit = document.getElementById("indoorSearchSubmit");
  const indoorSearchInput = document.getElementById("indoorSearchInput");

  indoorSearchSubmit.addEventListener("click", () => {
    geoMap.runIndoorSearch(<HTMLInputElement>indoorSearchInput);
  });

  indoorSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      geoMap.runIndoorSearch(<HTMLInputElement>indoorSearchInput);
    }
  });
}

export default {
  render,
};
