define([
    'jquery',
    'underscore',
    'backbone',
    'dispatcher'
], function($, _, Backbone, dispatcher) {

    var BrogueRouter = Backbone.Router.extend({

        routes: {
            "highScores":        "highScores",
            "currentGames":      "currentGames",
            "gameStatistics":    "gameStatistics",
            "viewRecording/:variant-:id": "viewRecording"
        },

        started: false,

        highScores: function() {
            dispatcher.trigger("all-scores");
        },
        currentGames: function() {
            dispatcher.trigger("currentGames");
        },
        gameStatistics: function() {
            dispatcher.trigger("gameStatistics");
        },
        viewRecording: function(variant, id) {

            var recordingId = 'recording-' + id;
            dispatcher.trigger("recordingGame", {variant: variant, id: recordingId});
            dispatcher.trigger("showConsole");
        },
        //Only activate the router on login, to avoid races when viewing recordings etc.
        login: function() {

            if(!this.started) { 
                Backbone.history.start();
                this.started = true;
            }
        }
    });
    
    return new BrogueRouter();
  });