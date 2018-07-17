// import { restClient } from '../../../../common/services';
// import { fetchDirections, fetchRoute, fetchToken } from '../directions';

// restClient.get = jest.fn();

// jest.mock('../../../../common/services/rest-client/rest-client');

// describe('Test for directions api', () => {
//     it('Should test for fetchToken method', async () => {
//         const token = await fetchToken('from', 'to');
//         expect(token).toBeDefined();
//     });

//     it('Should test for fetchToken method', async () => {
//         const token = await fetchRoute('token');
//         expect(token).toBeDefined();
//     });
// });

import * as directions from '../directions';
import { restClient } from '../../../../common/services/rest-client/rest-client';

const mockDirectionResponse = {
    status: 'success',
    path: [
        ['22.372081', '114.107877'],
        ['22.326442', '114.167811'],
        ['22.284419', '114.159510']
    ],
    total_distance: 20000,
    total_time: 1800
};

describe('Test for directions api', () => {
    it('Should test for fetchToken method', async () => {
        const post = jest.spyOn(restClient, 'post');

        post.mockImplementation(() =>
            Promise.resolve({ data: { token: 'token' } })
        );

        const token = await directions.fetchToken('from', 'to');
        expect(token).toBeDefined();
    });

    it('Should test for fetchToken method', async () => {
        const get = jest.spyOn(restClient, 'get');

        get.mockImplementation(() =>
            Promise.resolve({ data: mockDirectionResponse })
        );

        const result = await directions.fetchRoute('token');
        expect(result).toBeDefined();
        expect(result.status).toEqual('success');
    });
});
