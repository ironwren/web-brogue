// View for current games rollup in the lobby

define([
    "jquery",
    "underscore",
    "backbone",
    "dataIO/send-generic",
    "views/view-activation-helpers",
], function ($, _, Backbone, send, activate) {

    var CurrentGamesRowView = Backbone.View.extend({
        tagName: "tr",
        className: "games-row",
        events : {
            "click #observe-game" : "observeGame"
        },
        
        template : _.template($('#current-games-row').html()),

        observeGame: function(event){
            event.preventDefault();

            var userNameStr = event.target.innerHTML;
            var userName = userNameStr.split(' ', 2)[1];

            send("brogue", "start", {username: userName});
            this.goToConsole();
        },

        render: function() {
            this.model.calculateFormattedIdleTime();
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        goToConsole : function() {
            activate.console();
        },

    });

    return CurrentGamesRowView;

});



