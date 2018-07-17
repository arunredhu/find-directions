import { restClient } from '../../../common/services/';
import { API_CONSTANTS } from '../../config';

/**
 * @name fetchRoute
 * @description This method fetch the route from the server based on token
 * @param token
 * @returns Route Info
 */
const fetchRoute = async token => {
    const url = `${API_CONSTANTS.route}/${token}`;
    const response = await restClient.get(url);
    const { data } = response;

    return data;
};

/**
 * @name fetchToken
 * @description This method fetch the token from the server based on the starting and drop-off point
 * @param from Starting Point
 * @param to Drop-off Point
 */
const fetchToken = async (from, to) => {
    const url = API_CONSTANTS.route;
    const request = {
        from,
        to
    };

    const response = await restClient.post(url, request);

    const { data } = response;

    return data.token;
};

/**
 * @description Fetch the directions based on the starting and drop-off point
 * This method first fetch the token and after based on token fetch the routing info
 * @param from Starting Point
 * @param to Drop-off Point
 */
const fetchDirections = async (from, to) => {
    const token = await fetchToken(from, to);
    let result = await fetchRoute(token);

    // if status is 'in progress' then retry the request again
    if (
        result &&
        result.status &&
        result.status.toLowerCase() === 'in progress'
    ) {
        result = await fetchDirections(from, to);
    }

    return result;
};

export { fetchDirections, fetchToken, fetchRoute };
