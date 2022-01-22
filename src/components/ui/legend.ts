import { COLORS } from "../../data/constants";

const legend = document.getElementById("legend");

function create(): void {
    let tbodyRef = document.getElementById('legendTable').getElementsByTagName('tbody')[0];

    addLegendRecord(tbodyRef, COLORS.ROOM, "Room");
    addLegendRecord(tbodyRef, COLORS.TOILET, "Toilet");
    addLegendRecord(tbodyRef, COLORS.STAIR, "Stairs");
    addLegendRecord(tbodyRef, COLORS.ROOM_SELECTED, "Selected");

    document.getElementById('legendHeaderButton').addEventListener("click", onCollapse);
}

function addLegendRecord(ref: HTMLTableSectionElement, color: string, text: string): void{
    var row = ref.insertRow();
    var cell = row.insertCell();
    var colorBox = document.createElement("td");
    colorBox.setAttribute("height", "20");
    colorBox.setAttribute("width", "20");
    colorBox.style.backgroundColor = color;
    cell.appendChild(colorBox);
    cell = row.insertCell();
    var textNode = document.createTextNode("\u00A0"+text);
    cell.appendChild(textNode);
}

function onCollapse(){
    let icon = document.getElementById('legendCollapseIcon')
    if (icon.innerHTML.startsWith("n")){
        icon.innerHTML = "remove"
    } else {
        icon.innerHTML = "north_east"
    }
}

export default {
    create
};