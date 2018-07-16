import React, { Component } from 'react';

import { DirectionsForm, DirectionsMap, RouteInfo } from './components';
import { fetchDirections } from './services';

import './Directions.css';

class Directions extends Component {
    constructor() {
        super();

        this.state = {
            directionsResponse: undefined
        };
    }

    getDirections = async (from, to) => {
        const response = await fetchDirections(from, to).catch(e => {
            this.showErrorMessage('Internal server error');
        });

        if (response && response.error) {
            this.showErrorMessage(response.error);
            return;
        }

        if (response && response.path) {
            this.setState(() => ({
                directionsResponse: response
            }));
        }
    };

    showErrorMessage = message => {
        alert(message);
    };

    render() {
        const { directionsResponse } = this.state;
        return (
            <div className="directions-container">
                <div className="direction-form-container">
                    <DirectionsForm getDirections={this.getDirections} />
                    <div className="directions-route-info">
                        {directionsResponse && (
                            <RouteInfo {...directionsResponse} />
                        )}
                    </div>
                </div>
                <div className="direction-map-container" />

                <DirectionsMap directions={directionsResponse} />
            </div>
        );
    }
}

export default Directions;
