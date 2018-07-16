import { restClient } from '../../common/rest-client';

const fetchRoute = async token => {
    const url = `route/${token}`;

    const response = await restClient.get(url);

    const { data } = response;

    return data;
};

const fetchToken = async (from, to) => {
    const url = `route`;

    const request = {
        from,
        to
    };

    const response = await restClient.post(url, request);

    const { data } = response;

    return data.token;
};

const fetchDirections = async (from, to) => {
    const token = await fetchToken(from, to);

    let result = await fetchRoute(token);

    if (
        result &&
        result.status &&
        result.status.toLowerCase() === 'in progress'
    ) {
        result = await fetchDirections(from, to);
    }

    return result;
};

export { fetchDirections };
