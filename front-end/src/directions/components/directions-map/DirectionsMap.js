import React, { Component } from 'react';

import { mapClient } from '../../../common/map-client';

import './DirectionsMap.css';

class DirectionsMap extends Component {
    mapContainer;
    map;
    google;

    constructor() {
        super();
    }

    initMap() {
        mapClient.then(google => {
            this.google = google;
            this.map = new google.maps.Map(this.mapContainer, {
                zoom: 11,
                center: { lat: 22.372081, lng: 114.107877 }
            });
        });
    }

    drawDirections = ({ path }) => {
        const dirCoordinates = path.map(item => ({
            lat: Number(item[0]),
            lng: Number(item[1])
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
