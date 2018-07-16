import React, { Component } from 'react';

import { mapClient } from '../../../common/map-client/map-client';

import './DirectionsMap.scss';

/**
 * @name DirectionsMap
 * @type {Component}
 * @extends Component React component
 * @description This component display the map and contains the functionality to render the routes
 */
class DirectionsMap extends Component {
    // map container to save the ref to render the map
    mapContainer;
    // containe the map reference after rendering the map
    map;
    // google map api reference
    google;

    /**
     * @name initMap
     * @description Initialize the map
     */
    initMap = async () => {
        this.google = await mapClient;

        this.map = new this.google.maps.Map(this.mapContainer, {
            zoom: 11,
            center: { lat: 22.372081, lng: 114.107877 }
        });
    };

    drawDirections = ({ path }) => {
        const dirCoordinates = path.map(([lat, lng]) => ({
            lat: Number(lat),
            lng: Number(lng)
        }));

        const dirPath = new this.google.maps.Polyline({
            path: dirCoordinates,
            geodesic: true,
            strokeColor: '#4285f4',
            strokeOpacity: 1.0,
            strokeWeight: 4
        });

        dirPath.setMap(this.map);
    };

    componentDidMount() {
        this.initMap();
    }

    componentWillReceiveProps(props) {
        const { directions } = props;
        if (directions) {
            this.drawDirections(directions);
        }
    }

    render() {
        return (
            <div className="map-container">
                <div ref={el => (this.mapContainer = el)} />
            </div>
        );
    }
}

export default DirectionsMap;
