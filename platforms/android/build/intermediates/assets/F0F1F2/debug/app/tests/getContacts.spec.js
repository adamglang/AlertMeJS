describe("getContacts", function() {
    "use strict";

    var contacts, model, getContacts, data;

    beforeEach(function() {
        contacts = require('nativescript-contacts');
        model = require("../main-view-model");
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
            }
        }
    });

    it("Sets the display name as contact name if display name is a string with length", function() {
        expect(getContacts.makeName(data)).toBe("John Smith");
    });
    
    it("Constructs the contact name from: \"prefix\", \"given\", \"middle\", \"family\", and \"suffix\" properties if \"displayname\" is not available", function() {
        data.name.displayname = null;
        expect(getContacts.makeName(data)).toBe("Mr. John Peter Smith Jr. ");
    });

});