import axios from 'axios';

import { baseUrl } from '../config';

const restClient = axios.create({
    baseURL: baseUrl
});

export { restClient };
