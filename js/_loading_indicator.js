const loading_indicator = document.getElementById('loading_indicator');

function loading() {
    loading_indicator.children[0].classList.add('indeterminate');
    loading_indicator.classList.remove('red');
}

function loadingEnd() {
    loading_indicator.children[0].classList.remove('indeterminate');
}

function loadingError(){
    loadingEnd();
    loading_indicator.classList.add('red');
}

export {loading, loadingEnd, loadingError}
