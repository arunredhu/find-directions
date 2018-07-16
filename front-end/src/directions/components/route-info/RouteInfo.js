import React from 'react';

import './RouteInfo.scss';

/**
 * @name RouteInfoItem
 * @type {Component}
 * @description Route info item component
 * @param {{label,value}} Object Props to stateless component
 * @returns {JSX}
 */
const RouteInfoItem = ({ label, value }) => (
    <div className="route-info-item">
        <div className="route-info-item-label">{label}: </div>
        <div className="route-info-item-value"> {value}</div>
    </div>
);

/**
 * @name RouteInfo
 * @type {Component}
 * @description Route info component. Display the route params like distance and time
 * @param {{total_distance,total_time}} Object Props to stateless component
 * @returns {JSX}
 */
const RouteInfo = ({ total_distance, total_time }) => (
    <div className="route-info">
        <RouteInfoItem label="Total distance" value={total_distance} />
        <RouteInfoItem label="Total time" value={total_time} />
    </div>
);

export default RouteInfo;
