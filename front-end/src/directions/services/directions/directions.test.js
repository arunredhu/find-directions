import { fetchDirections } from './directions';

jest.mock('../fetchRoute');
jest.mock('../fetchToken');

describe('Test for directions api', () => {
    it('Should test for fetchDirections method', async () => {
        const data = await fetchDirections();
        expect(data).toBeDefined();
    });
});
