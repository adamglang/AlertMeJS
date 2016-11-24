// require the observable
var observable = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

// define our model
var model = new observable.fromObject({
    contacts: ObservableArray([]) || []
});

// export it to the view
module.exports = model;