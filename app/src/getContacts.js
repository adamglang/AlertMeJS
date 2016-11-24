var contacts = require('nativescript-contacts');
var model = require("../main-view-model");

var GetContacts = {

    init: function() {
        var self = this;
        contacts.getContact().then(function(args){
            model.contactName = self.makeName(args.data);
            model.phone = self.getPhoneNumber(args.data);
        }).catch(function(e) {
            console.log("promise \"contacts.getContact()\" failed with" + e.stack + "\n" + "value of self:" + " " + self)
        });
    },

    getPhoneNumber: function(data) {
        if(data.phoneNumbers.length > 0){
            return data.phoneNumbers[0];
        }
    },

    makeName: function(data) {
        if(data.name.displayname) {
            return data.name.displayname;
        }
        else {
            var name = "";
            var nameObj = {
                prefix: data.name.prefix,
                given: data.name.given,
                middle: data.name.middle,
                family: data.name.family,
                suffix: data.name.suffix
            };

            for(var key in nameObj) {
                if(typeof nameObj[key] === "string") {
                    name += nameObj[key] + " ";
                }
            }
            return name;
        }
    }

};

module.exports = GetContacts;