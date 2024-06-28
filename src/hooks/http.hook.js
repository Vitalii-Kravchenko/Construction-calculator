export const useHttp = () => {
    const _apiBase = 'https://66777f74145714a1bd74e080.mockapi.io/api/v1';
    const _apiNBU = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    const request = async (url, method = 'GET', body = null, headers = {}) => {
        let formattedUrl;

        if (url === 'exchange') {
            formattedUrl = _apiNBU;
        } else {
            formattedUrl = `${_apiBase}${url}`;
        }

        if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(formattedUrl, {method, body, headers});

        if(!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    }

    return {request};
}