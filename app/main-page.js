// lets require our dependencies
var contacts = require('nativescript-contacts');
var messenger = require('nativescript-messenger');
var model = require("./main-view-model");

// lets set up our model so its accessible in the page
exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = model;
}

contacts.getContact().then(function(result){

    var contact = result.data;
    model.contact_name = contact.name.given;
    // grab the first phone number in contact
    if(contact.phoneNumbers.length > 0){
        model.phone = contact.phoneNumbers[0];
    }

});

