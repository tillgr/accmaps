export const DescriptionArea = {
  update(message: string): void {
    const popUpArea = document.getElementById("descriptionArea");
    popUpArea.innerText = message;
    popUpArea.focus();
  },
};
