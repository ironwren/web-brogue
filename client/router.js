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
        "gameStatistics":    "gameStatistics"
//        "search/:query":        "search",  // #search/kiwis
  //      "search/:query/p:page": "search"   // #search/kiwis/p7
        },

        highScores: function() {
            dispatcher.trigger("all-scores");
        },
        currentGames: function() {
            dispatcher.trigger("currentGames");
        },
        gameStatistics: function() {
            dispatcher.trigger("gameStatistics");
        },
    });
    
    return new BrogueRouter();
  });