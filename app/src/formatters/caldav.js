function formatCalendar(events) {
    const r = [];
    calendar(r, () => {
        events.forEach(e => event(r, e));
    });
    return r.join('\r\n');
}

function calendar(r, cb) {
    r.push('BEGIN:VCALENDAR');
    calendarMetadata(r);
    calendarTimezoneInfo(r);
    cb();
    r.push('END:VCALENDAR');
}

function event(r, event) {
    const eventDate = [
        event.date.getUTCFullYear(),
        padNumber(event.date.getUTCMonth()+1, 2),
        padNumber(event.date.getUTCDate(), 2)
    ].map(n => n.toString()).join('');

    r.push('BEGIN:VEVENT');
    r.push(`DTSTAMP:${eventDate}T100000Z`);
    r.push(`DTSTART;VALUE=DATE:${eventDate}`);
    r.push(`DTEND;VALUE=DATE:${eventDate}`);
    r.push('RRULE:FREQ=YEARLY');
    r.push('SEQUENCE:1');
    r.push(`SUMMARY:${event.name}`);
    r.push('TRANSP:OPAQUE');
    r.push(`UID:${event.id}`);

    r.push('BEGIN:VALARM');
    r.push('TRIGGER:-PT15M');
    r.push('ACTION:DISPLAY');
    r.push('DESCRIPTION:Reminder');
    r.push('END:VALARM');

    r.push('END:VEVENT');
}

function calendarMetadata(r) {
    r.push('VERSION:2.0');
    r.push('CALSCALE:GREGORIAN');
    r.push('METHOD:PUBLISH');
    r.push('PRODID:-//Sirikon//Birthdays Calendar//EN');
    r.push('X-APPLE-CALENDAR-COLOR:#FF0084');
    r.push('X-WR-CALNAME:Birthdays Calendar');
    r.push('X-WR-TIMEZONE:Europe/Madrid');
}

function calendarTimezoneInfo(r) {
    r.push('BEGIN:VTIMEZONE');
    r.push('TZID:Europe/Madrid');
    r.push('BEGIN:STANDARD');
    r.push('DTSTART:19700101T000000');
    r.push('RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU');
    r.push('TZOFFSETFROM:+0200');
    r.push('TZOFFSETTO:+0100');
    r.push('END:STANDARD');
    r.push('BEGIN:DAYLIGHT');
    r.push('DTSTART:19700101T000000');
    r.push('RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU');
    r.push('TZOFFSETFROM:+0100');
    r.push('TZOFFSETTO:+0200');
    r.push('END:DAYLIGHT');
    r.push('END:VTIMEZONE');
}

function padNumber(value, zeroes) {
    const base = Array.call(null, zeroes+1).join('0') + value.toString();
    return base.substr(-zeroes);
}

module.exports = {
    format: formatCalendar
}
