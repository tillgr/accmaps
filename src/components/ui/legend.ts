import { colors } from "../../services/colorService";

const legend = document.getElementById("legend");

function create(): void {
  const tbodyRef = document
    .getElementById("legendTable")
    .getElementsByTagName("tbody")[0];

  addLegendRecord(tbodyRef, colors.roomColor, "Room");
  addLegendRecord(tbodyRef, colors.toiletColor, "Toilet");
  addLegendRecord(tbodyRef, colors.stairsColor, "Stairs");
  addLegendRecord(tbodyRef, colors.roomColorS, "Selected");

  document
    .getElementById("legendHeaderButton")
    .addEventListener("click", onCollapse);
}

function addLegendRecord(
  ref: HTMLTableSectionElement,
  color: string,
  text: string
): void {
  const row = ref.insertRow();
  let cell = row.insertCell();
  const colorBox = document.createElement("td");
  colorBox.setAttribute("height", "20");
  colorBox.setAttribute("width", "20");
  colorBox.style.backgroundColor = color;
  cell.appendChild(colorBox);
  cell = row.insertCell();
  const textNode = document.createTextNode("\u00A0" + text);
  cell.appendChild(textNode);
}

function onCollapse() {
  const icon = document.getElementById("legendCollapseIcon");
  if (icon.innerHTML.startsWith("n")) {
    icon.innerHTML = "remove";
  } else {
    icon.innerHTML = "north_east";
  }
}

export default {
  create,
};
