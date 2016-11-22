describe("getPermissions", function() {
    "use strict";

    var permissions, getPermissions;

    beforeEach(function() {
        permissions = require('nativescript-permissions');
        getPermissions = require('../src/getPermissions.js');
    });

    it("triggers the permissions request", function() {
        spyOn(permissions, "requestPermission");
        getPermissions("permissionsNeeded","success");
        expect(permissions.requestPermission).toHaveBeenCalled();
    });


});