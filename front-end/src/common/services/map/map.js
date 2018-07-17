import GoogleMapsLoader from 'google-maps';

import { googleAPIKey } from '../../config';

init();

//initialize the map configuration
function init() {
    GoogleMapsLoader.KEY = googleAPIKey;
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
}

let google;
const loadMap = () =>
    new Promise((resolve, reject) => {
        if (google) {
            resolve(google);
        } else {
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
            });
        }
    });

const maps = async () => {
    const google = await loadMap();
    return google.maps;
};

export { maps };
