var express = require('express');
var app = express();
const axios = require('axios');
const fs = require('fs');

const carddav = require('./src/parsers/carddav')
const caldav = require('./src/formatters/caldav')

const config = JSON.parse(fs.readFileSync('./config.json', {encoding: 'utf8'}));
const PORT = 80;

app.get(`/${config.secret}/calendar.ics`, function (req, res) {

  axios.get(config.contactsUrl, {
    auth: {
      username: config.contactsUsername,
      password: config.contactsPassword
    },
    responseType: 'text'
  }).then((result) => {
    res.setHeader('content-type', 'text/calendar');
    res.send(caldav.format(carddav.parse(result.data)));
  })

});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
