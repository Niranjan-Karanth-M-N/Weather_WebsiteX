const request = require("request");

const forecast = function (latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=021359614769182257f47e6911fee5b9&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  // 37.8267,-122.4233
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        "It's currenly " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " Degrees out."
      );
    }
  });
};

module.exports = forecast;
