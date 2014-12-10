define([
    'tests/mock-brogue-message-rand-full',
    'tests/mock-brogue-message-rand-few',
    'tests/mock-brogue-message-single',
    'tests/brogue-show-messages',
    'tests/send-custom-socket-message'
], function(brogueFullRandMsg, brogueFewRandMsg, brogueUpdateCell, brogueShowMessage, customMessage) {

    // Eventually we should set up unit test assertions based on these functions, but for now these are just a collection of utility functions that we can use from the client to test the views and the socket commands.

    function attach(){
        window.brogue = {
            dispatchConsoleFullRandom : brogueFullRandMsg,
            dispatchConsoleFewRandom : brogueFewRandMsg,
            dispatchConsoleSingleCell : brogueUpdateCell,
            showIncomingMessages : brogueShowMessage,
            sendMessage : customMessage
        };
    }

    return {
        attachToGlobalScope : attach
    };

});

