const loading_indicator = document.getElementById('loading_indicator');

export const LoadingIndicator = {
    start(): void {
        loading_indicator.children[0].classList.add('indeterminate');
        loading_indicator.classList.remove('red');
    },

    end(): void {
        loading_indicator.children[0].classList.remove('indeterminate');
    },

    error(): void {
        LoadingIndicator.end();
        loading_indicator.classList.add('red');
    }
}
