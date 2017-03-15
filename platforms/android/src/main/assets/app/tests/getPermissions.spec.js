describe("getPermissions", function() {
    "use strict";

    let permissions, getPermissions;

    beforeEach(() => {
        permissions = require('nativescript-permissions');
        getPermissions = require('../src/getPermissions.js');
    });

    it("triggers the permissions request", () => {
        spyOn(permissions, "requestPermission");
        getPermissions("permissionsNeeded","success");
        expect(permissions.requestPermission).toHaveBeenCalled();
    });

});