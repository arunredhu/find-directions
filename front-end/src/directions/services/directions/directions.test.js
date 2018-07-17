import * as directions from '../directions';
import { restClient } from '../../../common/services/rest-client/rest-client';

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

const mockTokenResponse = {
    token: 'token'
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

    it('Should test for fetchRoute method', async () => {
        const get = jest.spyOn(restClient, 'get');

        get.mockImplementation(() =>
            Promise.resolve({ data: mockDirectionResponse })
        );

        const result = await directions.fetchRoute('token');
        expect(result).toBeDefined();
        expect(result.status).toEqual('success');
    });

    it('Should test for fetchRoute method', async () => {
        const fetchRoute = jest.spyOn(directions, 'fetchRoute');
        const fetchToken = jest.spyOn(directions, 'fetchToken');

        fetchRoute.mockImplementation(() =>
            Promise.resolve({ data: mockDirectionResponse })
        );

        fetchToken.mockImplementation(() =>
            Promise.resolve({ data: mockTokenResponse })
        );

        const result = await directions.fetchRoute('token');
        expect(result).toBeDefined();
        expect(result.status).toEqual('success');
    });
});
