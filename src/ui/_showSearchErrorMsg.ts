export function showSearchErrorMsg(errorMessage: string): void {
    const buildSearchErrorMsg = document.getElementById('searchErrorMessage');
    const buildSearchErrorMsgContainer = buildSearchErrorMsg.parentElement;

    buildSearchErrorMsg.innerHTML = errorMessage;
    buildSearchErrorMsgContainer.classList.remove('scale-out');
    buildSearchErrorMsgContainer.classList.add('scale-in');
    buildSearchErrorMsg.focus();

    window.setTimeout(() => {
        buildSearchErrorMsgContainer.classList.remove('scale-in');
        buildSearchErrorMsgContainer.classList.add('scale-out');
    }, 5000)
}
