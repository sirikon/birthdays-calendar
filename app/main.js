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
  getEvents().then(events => {
    res.send(events);
  })
})

app.get(`/${config.secret}/calendar.ics`, function (req, res) {
  getEvents().then(events => {
    res.setHeader('content-type', 'text/calendar');
    res.send(caldav.format(events));
  })
});

function getEvents() {
  return fetchContacts()
    .then(contacts => {
      return contacts
        .filter(c => !!c.birthday)
        .map(contactToEvent);
    })
}

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

function contactToEvent(contact) {
  return {
    id: `${contact.name.toLowerCase()}@birthdays.sirikon.me`,
    name: `Birthday ${contact.name}`,
    date: new Date(Date.UTC(
      contact.birthday.year || new Date().getFullYear(),
      contact.birthday.month - 1,
      contact.birthday.day
    ))
  }
}

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port);
});
