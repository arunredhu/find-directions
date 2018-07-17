import GoogleMapsLoader from 'google-maps';

import { googleAPIKey } from '../config';

init();

//initialize the map configuration
function init() {
    GoogleMapsLoader.KEY = googleAPIKey;
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
}

let google;
const mapClient = new Promise((resolve, reject) => {
    if (google) {
        resolve(google);
    } else {
        GoogleMapsLoader.load(api => {
            google = api;
            resolve(api);
        });
    }
});

export { mapClient };
