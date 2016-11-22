var getContact = function() {

    var GetContact = this;
    var contacts = require('nativescript-contacts');
    var model = require("../main-view-model");

    GetContact.init = (function() {
        contacts.getContact().then(function(args){
            var contact = args.data;
            model.contact_name = contact.name.given + " " + contact.name.family;
            if(contact.phoneNumbers.length > 0){
                model.phone = contact.phoneNumbers[0];
            }
        });
    }());

    
};

module.exports = getContact;
