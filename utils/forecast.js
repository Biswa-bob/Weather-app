const request = require("postman-request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ef871919ce56dd30212b5363e941dead&query=${address}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find Location", undefined);
    } else {
      callback(undefined, {
        locate: response.body.request.query,
        weather: `It is currently ${response.body.current.temperature} degress out. There is ${response.body.current.precip}% chances of rain.`,
      });
    }
  });
};

module.exports = forecast;
