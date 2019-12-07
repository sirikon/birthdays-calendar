var express = require('express');
var app = express();
const axios = require('axios');
const fs = require('fs');

const carddav = require('./src/parsers/carddav');
const caldav = require('./src/formatters/caldav');

const config = {
  contactsUrl: process.env.CONTACTS_URL,
  contactsUsername: process.env.CONTACTS_USERNAME,
  contactsPassword: process.env.CONTACTS_PASSWORD,
  secret: process.env.SECRET,
  port: process.env.PORT || 80
};

app.get(`/${config.secret}/calendar.json`, (req, res) => {
  fetchContacts().then(contacts => {
    res.send(contacts.filter(c => !!c.birthday));
  })
})

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

function fetchContacts() {
  return axios.get(config.contactsUrl, {
    auth: {
      username: config.contactsUsername,
      password: config.contactsPassword
    },
    responseType: 'text'
  }).then((result) => {
    return carddav.parse(result.data);
  })
}

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port);
});
