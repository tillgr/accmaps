export function updateDescriptionPopUp(message) {
    const popUpArea = document.getElementById('descriptionArea');
    if (popUpArea.innerText === "") {
        popUpArea.classList.add('scale-in');
    }
    popUpArea.innerText = message;
    popUpArea.focus();
}
