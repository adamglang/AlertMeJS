(function(Executables) {
    
    var model = require("./main-view-model");
    var getContacts = require('./src/getContacts.js');
    var getPermissions = require('./src/getPermissions.js');
    var sendMessages = require('./src/sendMessages.js');

    Executables.pageLoaded = function(args) {
        var page = args.object;
        page.bindingContext = model;
        getPermissions();
    };

    Executables.sendMessage = function(){
        sendMessages();
    };

    Executables.getContacts = function() {
        getContacts.init();
    };

}(exports));

