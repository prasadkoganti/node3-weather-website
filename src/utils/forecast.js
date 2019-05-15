const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2344136ae05e962c3b99ff547ac73765/' + latitude + ',' + longitude + '?units=si';

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Could not connect to forecast service', undefined);
        } else if (body.error) {
            callback('Could not fetch forecast for given coordinates. Try again', undefined);
        } else {
            callback(undefined, body.daily.summary + '\n' +
                'Temperature out there is ' +
                body.currently.temperature +
                ' celcius. There is ' + body.currently.precipProbability + '% chance of rain'
            );
        }
    })
}

module.exports = forecast;