import React from 'react';
import renderer from 'react-test-renderer';

import DirectionsForm from '../directions-form/DirectionsForm';

describe('Direction Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<DirectionsForm />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
