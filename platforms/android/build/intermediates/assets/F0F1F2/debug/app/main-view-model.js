var Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        return "I love Yasmin Lang!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    };

    return viewModel;
}

exports.createViewModel = createViewModel;