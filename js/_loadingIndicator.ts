const loading_indicator = document.getElementById('loading_indicator');

export const LoadingIndicator = {
    start() {
        loading_indicator.children[0].classList.add('indeterminate');
        loading_indicator.classList.remove('red');
    },

    end() {
        loading_indicator.children[0].classList.remove('indeterminate');
    },

    error() {
        LoadingIndicator.end();
        loading_indicator.classList.add('red');
    }
}
