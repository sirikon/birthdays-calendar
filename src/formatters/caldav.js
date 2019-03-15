const slugify = require('slugify');

module.exports = {
    format: function(birthdays) {
        var chunks = [];

        birthdays.forEach((birthday) => {
            chunks.push(`BEGIN:VEVENT
DTEND;VALUE=DATE:${birthday.date.replace(/\-/g, '')}
DTSTAMP:${birthday.date.replace(/\-/g, '')}T100000Z
DTSTART;VALUE=DATE:${birthday.date.replace(/\-/g, '')}
RRULE:FREQ=YEARLY
SEQUENCE:1
SUMMARY:Birthday ${birthday.name.replace(/\-/g, '')}
TRANSP:OPAQUE
UID:${slugify(birthday.date + '-' + birthday.name)}@birthdays.sirikon.me
END:VEVENT
`)
        });

        var result = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
PRODID:-//FastMail/1.0/EN
X-APPLE-CALENDAR-COLOR:#EF5411
X-WR-CALNAME:Birthdays
X-WR-TIMEZONE:Europe/Madrid
BEGIN:VTIMEZONE
TZID:Europe/Madrid
BEGIN:STANDARD
DTSTART:19700101T000000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700101T000000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
` + chunks.join('') + 'END:VCALENDAR\n';

        return result.replace(/\n/g, '\r\n');
    }
}
