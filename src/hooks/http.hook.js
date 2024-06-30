export const useHttp = () => {
    const _apiBase = 'http://localhost:3001';
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