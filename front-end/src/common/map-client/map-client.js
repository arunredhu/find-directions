import GoogleMapsLoader from 'google-maps';

import { googleAPIKey } from '../config';

GoogleMapsLoader.KEY = googleAPIKey;

GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];

let google = undefined;

GoogleMapsLoader.load(api => {
    google = api;
});

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
