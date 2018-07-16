import React from 'react';
import renderer from 'react-test-renderer';

import DirectionsMap from '../directions-map/DirectionsMap';

describe('Direction Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<DirectionsMap />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
