import { COLORS } from "../../data/constants";
import * as string from '../../../public/strings/lang.en.json';

const legend = document.getElementById("legend");

function create(): void {
    let tbodyRef = document.getElementById('legendTable').getElementsByTagName('tbody')[0];

    addLegendRecord(tbodyRef, COLORS.ROOM, string.legendRoom);
    addLegendRecord(tbodyRef, COLORS.TOILET, string.legendToilet);
    addLegendRecord(tbodyRef, COLORS.STAIR, string.legendStairs);
    addLegendRecord(tbodyRef, COLORS.ROOM_SELECTED, string.legendSelected);

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