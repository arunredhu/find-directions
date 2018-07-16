import React, { Component } from 'react';
import { mapClient } from '../../../common/map-client';

import './DirectionsForm.css';

class DirectionsForm extends Component {
    constructor() {
        super();

        this.fromInput = undefined;
        this.fromInputAutoComplete = undefined;
        this.toInputAutoComplete = undefined;
        this.toInput = undefined;
    }

    handleChange = () => {
        const from = this.fromInputAutoComplete.getPlace();
        const to = this.toInputAutoComplete.getPlace();
        this.props.getDirections(from, to);
    };

    renderAutoComplete = () => {
        mapClient.then(google => {
            this.fromInputAutoComplete = new google.maps.places.Autocomplete(
                this.fromInput
            );

            this.toInputAutoComplete = new google.maps.places.Autocomplete(
                this.toInput
            );
        });
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

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
                    <button onClick={this.handleChange}>Get Route</button>
                </div>
            </div>
        );
    }
}

export default DirectionsForm;
