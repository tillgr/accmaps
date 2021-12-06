import {toastMessage} from "./_toastMessage";

const loadingIndicator = document.getElementById('loadingIndicator');

export const LoadingIndicator = {
    start(): void {
        loadingIndicator.classList.remove('text-danger');
        loadingIndicator.classList.add('text-primary');
        loadingIndicator.classList.remove('d-none');
    },

    end(): void {
        loadingIndicator.classList.add('d-none');
    },

    error(message: string): void {
        loadingIndicator.classList.remove('text-primary');
        loadingIndicator.classList.add('text-danger');
        setTimeout(LoadingIndicator.end, 2000);

        toastMessage(message);
    }
}
