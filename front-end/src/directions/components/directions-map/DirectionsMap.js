import React, { Component } from 'react';

import { maps } from '../../../common/services';

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
    maps;

    /**
     * @name initMap
     * @description Initialize the map
     */
    initMap = async () => {
        this.maps = await this.props.maps();

        this.map = new this.maps.Map(this.mapContainer, {
            zoom: 11,
            center: { lat: 22.372081, lng: 114.107877 }
        });
    };

    /**
     * @description Prepare Map positions from path points
     * @param path Array of points
     */
    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new this.maps.LatLng(lat, lng));
    };

    /**
     * @description Plot the received points on map as route directions
     * @param Object Response object returned from the Api containing the path points
     */
    drawDirections = ({ path }) => {
        const directionsService = new this.maps.DirectionsService();
        const directionsRenderer = new this.maps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        const positions = this.preparePositionsFromPath(path);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));

        // request for the google map directions api
        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: this.maps.TravelMode.DRIVING
        };

        // get the route from directionService and then plot with the help of directionsRenderer
        directionsService.route(request, (response, status) => {
            if (status === this.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

    componentDidMount() {
        this.initMap();
    }

    getSnapshotBeforeUpdate() {
        const { directions } = this.props;
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

DirectionsMap.defaultProps = {
    maps
};

export default DirectionsMap;
