import React, { Component } from 'react';
import { mapClient } from '../../../common/map-client/map-client';

import './DirectionsForm.scss';

/**
 * @name DirectionsForm
 * @type {Component}
 * @extends Component React component
 * @description This component contins the auto complete form
 */
class DirectionsForm extends Component {
    /**@constructor */
    constructor() {
        super();
        // Starting point input, needs to save ref
        this.fromInput = undefined;
        // Starting point Autocomplete, After rendering the google autocomplete, reference will be saved in this
        this.fromInputAutoComplete = undefined;
        // Drop-off point input, needs to save ref
        this.toInputAutoComplete = undefined;
        // Drop-off point Autocomplete, After rendering the google autocomplete, reference will be saved in this
        this.toInput = undefined;
    }

    /**
     * @name getRoute
     * @description call the parent 'getDirections' method and supply current Starting and drop-off points
     */
    getRoute = () => {
        const from = this.fromInputAutoComplete.getPlace();
        const to = this.toInputAutoComplete.getPlace();
        this.props.getDirections(from, to);
    };

    /**
     * @name renderAutoComplete
     * @description Attach the google places autocomplete to the inputs
     */
    renderAutoComplete = async () => {
        const google = await mapClient;

        this.fromInputAutoComplete = new google.maps.places.Autocomplete(
            this.fromInput
        );

        this.toInputAutoComplete = new google.maps.places.Autocomplete(
            this.toInput
        );
    };

    /**
     * Component lifecycle hook
     */
    componentDidMount() {
        this.renderAutoComplete();
    }

    /**
     * Component render method
     */
    render() {
        return (
            <div className="directions-form">
                <div className="form-input">
                    <label>Starting Location</label>
                    <input type="text" ref={el => (this.fromInput = el)} />
                </div>
                <div className="form-input">
                    <label>Drop-off point</label>
                    <input type="text" ref={el => (this.toInput = el)} />
                </div>
                <div className="get-route-btn">
                    <button onClick={this.getRoute}>Get Route</button>
                </div>
            </div>
        );
    }
}

export default DirectionsForm;
