import React from 'react';
import renderer from 'react-test-renderer';

import RouteInfo from '../route-info/RouteInfo';

describe('Direction Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<RouteInfo />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
