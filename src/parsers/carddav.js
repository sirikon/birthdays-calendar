module.exports = {
    parse: function(string) {
        string = string.replace(/\r/g, '');
        var lines = string.split('\n');

        var birthdays = [];
        var currentBirthday = null;

        lines.forEach((line) => {
            if (line === "BEGIN:VCARD") {
                currentBirthday = { valid: false };
                return;
            }
            if (line.indexOf('FN:') === 0) {
                currentBirthday.name = line.split(':')[1];
                return;
            }
            if (line.indexOf('BDAY:') === 0) {
                currentBirthday.date = line.split(':')[1];
                currentBirthday.valid = true;
                return;
            }
            if (line === 'END:VCARD') {
                if (currentBirthday.valid) {
                    delete currentBirthday.valid;
                    birthdays.push(currentBirthday);
                    currentBirthday = null;
                }
            }
        })

        return birthdays;
    }
}
