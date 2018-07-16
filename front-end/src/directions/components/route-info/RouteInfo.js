import React from 'react';

import './RouteInfo.css';

const RouteInfoItem = ({ label, value }) => (
    <div className="route-info-item">
        <div className="route-info-item-label">{label}: </div>
        <div className="route-info-item-value"> {value}</div>
    </div>
);

const RouteInfo = ({ total_distance, total_time }) => (
    <div className="route-info">
        <RouteInfoItem label="Total distance" value={total_distance} />
        <RouteInfoItem label="Total time" value={total_time} />
    </div>
);

export default RouteInfo;
