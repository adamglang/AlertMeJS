describe("getContacts", function() {
    "use strict";

    var contacts, model, getContacts, data;

    beforeEach(function() {
        contacts = require('nativescript-contacts');
        model = require("../main-view-model");
        model.contacts = [];
        getContacts = require('../src/getContacts.js');

        data = {
            "name": {
                "given": "John",
                "middle": "Peter",
                "family": "Smith",
                "prefix": "Mr.",
                "suffix": "Jr.",
                "testEmptyObject": {},
                "testEmptyString": "",
                "testNumber": 0,
                "testNull": null,
                "testBool": true,
                "displayname": "John Smith",
                "phonetic": {
                    "given": null,
                    "middle": null,
                    "family": null
                }
            },
            "phoneNumbers": [
                {
                    "id": "",
                    "label": "Mobile",
                    "value": "2069312099"
                },
                {
                    "id": "",
                    "label": "Mobile",
                    "value": "2069312099"
                }
            ]
        }

    });

    describe("addContact", function() {
        it("adds a contact to the contacts array", function() {
            getContacts.addContact(data);
            expect(JSON.stringify(model.contacts)).toBe("[{\"contactName\":\"John Smith\",\"contactPhone\":\"2069312099\"}]");
            getContacts.addContact(data);
            expect(JSON.stringify(model.contacts)).toBe("[{\"contactName\":\"John Smith\",\"contactPhone\":\"2069312099\"},{\"contactName\":\"John Smith\",\"contactPhone\":\"2069312099\"}]");
        });
    });

    describe("makeName", function() {
        it("Sets the display name as contact name if display name is a string with length", function() {
            expect(getContacts.makeName(data)).toBe("John Smith");
        });

        it("Constructs the contact name from: \"prefix\", \"given\", \"middle\", \"family\", and \"suffix\" properties if \"displayname\" is not available", function() {
            data.name.displayname = null;
            expect(getContacts.makeName(data)).toBe("Mr. John Peter Smith Jr. ");
        });
    });

    describe("getPhoneNumber", function() {
        it("gets the first phone number in the returned array", function() {
            expect(getContacts.getPhoneNumber(data)).toBe("2069312099");
        });
    });

});