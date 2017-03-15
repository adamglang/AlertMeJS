describe("getContacts", function() {
    "use strict";

    let contacts, model, getContacts, data;

    beforeEach(function() {
        contacts = require('nativescript-contacts');
        model = require("../main-view-model");
        model.contacts = [{"contactName":"John Smith","contactPhone":"2069312099"}];
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

    describe("addContact", () => {
        it("adds a contact to the contacts array", () => {
            getContacts.addContact(data);
            expect(model.contacts).toEqual([{contactName:"John Smith",contactPhone:"2069312099"},{contactName:"John Smith",contactPhone:"2069312099"}]);
        });
    });

    describe("removeContacts", () => {
        it("removes the contacts from the contacts array", () => {
            getContacts.removeContacts(data);
            expect(model.contacts.length > 0).toBe(false);
        });
    });

    describe("makeName", () => {
        it("Sets the display name as contact name if display name is a string with length", () => {
            expect(getContacts.makeName(data)).toBe("John Smith");
        });

        it("Constructs the contact name from: \"prefix\", \"given\", \"middle\", \"family\", and \"suffix\" properties if \"displayname\" is not available", () => {
            data.name.displayname = null;
            expect(getContacts.makeName(data)).toBe("Mr. John Peter Smith Jr. ");
        });
    });

    describe("getPhoneNumber", () => {
        it("gets the first phone number in the returned array", () => {
            expect(getContacts.getPhoneNumber(data)).toBe("2069312099");
        });
    });

});