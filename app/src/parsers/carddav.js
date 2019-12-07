module.exports = {
    parse: function(rawData) {
        const data = rawData.replace(/\r/g, '');
        const lines = data
            .split('\n')
            .map(l => l.trim())
            .filter(l => !!l);

        const contacts = [];
        let currentContact = null;

        lines.forEach((line) => {
            if (line === "BEGIN:VCARD") {
                currentContact = {};
                return;
            }
            if (line === 'END:VCARD') {
                contacts.push(currentContact);
                currentContact = null;
                return;
            }

            if (line.indexOf('FN:') === 0) {
                currentContact.name = line.split(':')[1];
                return;
            }
            if (line.indexOf('BDAY:') === 0) {
                const date = line.split(':')[1];
                const dateParts = date.split('-');
                currentContact.birthday = {
                    year: parseInt(dateParts[0]),
                    month: parseInt(dateParts[1]),
                    day: parseInt(dateParts[2])
                };
                return;
            }
            if (line.indexOf('BDAY;X-APPLE-OMIT-YEAR') === 0) {
                const date = line.split(':')[1];
                const dateParts = date.split('-');
                currentContact.birthday = {
                    month: parseInt(dateParts[1]),
                    day: parseInt(dateParts[2])
                };
                return;
            }
        })

        return contacts;
    }
}
