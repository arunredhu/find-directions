import React, { Component } from 'react';

import { DirectionsForm, DirectionsMap, RouteInfo } from './components';
import { fetchDirections } from './services';

import './Directions.scss';

/**
 * @type {Component}
 * @name Directions
 * @description Directions components (Main view of directions module)
 */
class Directions extends Component {
    /**
     * @constructor
     */
    constructor() {
        super();

        // initial state
        this.state = {
            directionsResponse: undefined
        };
    }

    /**
     * @description Fetch the directions
     * This method call the Directions serive to fetch the data
     * @param from Starting Location
     * @param to Drop-off point
     */
    getDirections = async (from, to) => {
        // directions result, if error then show error messgae
        const response = await fetchDirections(from, to).catch(e => {
            this.showErrorMessage('Internal server error');
        });

        // check for response error
        if (response && response.error) {
            this.showErrorMessage(response.error);
            return;
        }

        // check for directions data, if available then set the data to state
        if (response && response.path) {
            this.setState(() => ({
                directionsResponse: response
            }));
        }
    };

    /**
     * @name showErrorMessage
     * @description This method display the error message
     * @param message Message to be displayed
     */
    showErrorMessage = message => {
        alert(message);
    };

    /**
     * @description Render method of the component
     */
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
