export const useHttp = () => {
    const _apiBase = 'https://66777f74145714a1bd74e080.mockapi.io/api/v1';

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type' : 'application/json'}) => {
        const response = await fetch(`${_apiBase}${url}`, {method, body, headers});

        if(!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    }

    return {request};
}