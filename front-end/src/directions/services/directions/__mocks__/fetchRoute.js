const fetchRoute = token =>
    new Promise((resolve, reject) => {
        resolve({
            status: 'success',
            path: [
                ['22.372081', '114.107877'],
                ['22.326442', '114.167811'],
                ['22.284419', '114.159510']
            ],
            total_distance: 20000,
            total_time: 1800
        });
    });

export default fetchRoute;
