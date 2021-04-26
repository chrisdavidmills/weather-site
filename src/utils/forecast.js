const request = require('request');

function forecast(lat, long, callback) {
  const url = `http://api.weatherstack.com/current?access_key=fc5996e3c2182c454ec495b95b1c39b2&query=${lat},${long}`;

  request({
    url,
    json: true
  },
  (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service.', undefined);
    } else if(body.error) {
      callback('Unable to find weather information.', undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        description: body.current.weather_descriptions[0].toLowerCase()
      });
    }
  })
}

module.exports = forecast;
