function update(message: string, elementId = "description"): void {
  const popUpArea = document.getElementById(elementId);
  popUpArea.innerText = message;
  popUpArea.focus();
}

export default {
  update,
};
