var getContact = function() {
    var contacts = require('nativescript-contacts');
    var model = require("../main-view-model");
    contacts.getContact().then(function(args){
        var contact = args.data;
        model.contact_name = contact.name.given + " " + contact.name.family;
        if(contact.phoneNumbers.length > 0){
            model.phone = contact.phoneNumbers[0];
        }
    });
};

module.exports = getContact;
