export const DescriptionPopup = {
    update(message: string) {
        const popUpArea = document.getElementById('descriptionArea');
        if (popUpArea.innerText === "") {
            popUpArea.classList.add('scale-in');
        }
        popUpArea.innerText = message;
        popUpArea.focus();
    }
}
