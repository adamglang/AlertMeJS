const contacts = require("nativescript-contacts"),
    model = require("../main-view-model"),
    ObservableArray = require("data/observable-array").ObservableArray;

let GetContacts = {

    init: function() {
        let self = this;
        contacts.getContact().then(function(args){
            self.addContact(args.data);
        }).catch(function(e) {
            console.log("promise \"contacts.getContact()\" failed with" + e.stack + "\n" + "value of self:" + " " + self)
        });
    },

    addContact: function(data) {
        let self = this;
        model.contacts.push({
            contactName: self.makeName(data),
            contactPhone: self.getPhoneNumber(data)
        });
    },

    removeContacts: function() {
        model.contacts = new ObservableArray([]);
    },

    getPhoneNumber: function(data) {
        if(data.phoneNumbers.length > 0){
            return data.phoneNumbers[0].value;
        }
    },

    makeName: function(data) {
        if(data.name.displayname) {
            return data.name.displayname;
        }
        else {
            let name = "";
            let nameObj = {
                prefix: data.name.prefix,
                given: data.name.given,
                middle: data.name.middle,
                family: data.name.family,
                suffix: data.name.suffix
            };

            for(let key in nameObj) {
                if(typeof nameObj[key] === "string") {
                    name += nameObj[key] + " ";
                }
            }
            return name;
        }
    }

};

module.exports = GetContacts;