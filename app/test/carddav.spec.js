const assert = require('assert');
const carddav = require('../src/parsers/carddav');

describe('Card DAV parser', () => {

    it('should parse correctly a person without birthday', () => {
        const data = `BEGIN:VCARD
VERSION:3.0
FN:John
N:;John;;;
EMAIL;TYPE=example@example.com
END:VCARD`;
        assert.deepEqual(carddav.parse(data), [
            {
                name: 'John'
            }
        ]);
    });

    it('should parse correctly a person with birthday', () => {
        const data = `BEGIN:VCARD
VERSION:3.0
FN:John
N:;John;;;
BDAY:1993-09-18
EMAIL;TYPE=example@example.com
END:VCARD`;
        assert.deepEqual(carddav.parse(data), [
            {
                name: 'John',
                birthday: {
                    year: 1993,
                    month: 9,
                    day: 18
                }
            }
        ]);
    });

    it('should parse correctly a person with birthday without year', () => {
        const data = `BEGIN:VCARD
VERSION:3.0
FN:John
N:;John;;;
BDAY;X-APPLE-OMIT-YEAR=1604:1604-09-18
EMAIL;TYPE=example@example.com
END:VCARD`;
        assert.deepEqual(carddav.parse(data), [
            {
                name: 'John',
                birthday: {
                    month: 9,
                    day: 18
                }
            }
        ]);
    });

});
