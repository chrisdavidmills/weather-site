const request = require('request');

function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=pk.eyJ1IjoiY2hyaXNkYXZpZG1pbGxzIiwiYSI6ImNrbnJkNXFxNzBzM3gyeG56bGphMzdvMWIifQ.ldzPU-Voo9bbbMWUGtpnuA&limit=1`;

  request({
    url,
    json: true
  },
  (error, {body}) => {
    if(error) {
      callback('Unable to connect to geolocation service.', undefined);
    } else if(!body.features || body.features.length === 0) {
      callback('Unable to find matching location.', undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        lat: body.features[0].center[1],
        long: body.features[0].center[0]
      });
    }
  })
}

module.exports = geocode;
