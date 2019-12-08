# Birthdays Calendar

This is a service that **reads your contacts** from a CardDAV endpoint and
**generates an iCal calendar** with all your contacts' **birthdays**.

So you can synchronize it wherever you want.

## Run

### With Docker Compose

Clone this repository and create a `.env` file at the root, that looks like
this, but with the correct info:
```
CONTACTS_URL=https://some.provider.net/your_contacts
CONTACTS_USERNAME=username
CONTACTS_PASSWORD=password
SECRET=some-random-string
```

- **CONTACTS_URL**: Should be a valid CardDAV endpoint with all your contacts.
Check your provider's or service's documentation for knowing how to get this
endpoint.
- **CONTACTS_USERNAME** and **CONTACTS_PASSWORD** is because this probably
needs some Basic Auth credentials for reading.
- **SECRET** is just a random string that you'll use in the URL to get your
birthdays iCal file. You don't want this endpoint to be public. Right?.

Once the configuration is done, run:
```bash
./scripts/compose.sh up -d --build
```

`compose.sh` script is just a wrapper for `docker-compose` command that sets
the correct project name and eases things up with scripting.

Your calendar is now available on local port `8001`, with the following url:
http://localhost:8001/your-secret/calendar.ics.

### Without Docker

You'll need Node. Any fairly recent version of Node should work properly. Tested with 10.x.x.

Now make this environment variables available:
```
CONTACTS_URL=https://some.provider.net/your_contacts
CONTACTS_USERNAME=username
CONTACTS_PASSWORD=password
SECRET=some-random-string
```

Now, inside `app` folder:

```
npm i --production
npm start
```
