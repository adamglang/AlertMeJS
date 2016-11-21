(function(Executables) {

    var app = require('application');
    var contacts = require('nativescript-contacts');
    var model = require("./main-view-model");
    var permissions = require('nativescript-permissions');
    var sms = android.telephony.SmsManager.getDefault();
    var getContact = require('./src/getContacts.js');

    Executables.pageLoaded = function(args) {
        var page = args.object;
        page.bindingContext = model;
    };

    Executables.sendMessage = function(args){
        var phonenumber = model.phone.value;
        sms.sendTextMessage(phonenumber, null, "Sent from alert me :)", null, null);
    };

    Executables.accessContacts = function() {
        permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, "I need these permissions because I'm cool")
            .then(function() {
                permissions.requestPermission(android.Manifest.permission.SEND_SMS, "I need these permissions because I'm cool")
                    .then(function() {
                        getContact();
                    })
                    .catch(function(error) {
                        console.log("Uh oh, no permissions - plan B time!" + "\n" + error);
                    });
            })
            .catch(function(error) {
                console.log("Uh oh, no permissions - plan B time!" + "\n" + error.stack);
            });
    };

}(exports));

