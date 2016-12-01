// require the observable
var observable = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

// define our model
var model = observable.fromObject({
    contacts: new ObservableArray([]),
    switches: new observable.Observable({
        "timestamp": false,
        "geoLocation": false
    })
});

// export it to the view
module.exports = model;