var _ = require("underscore");
const path = require("path");
const fs = require("fs");
var stats = require('../stats/stats.js');

module.exports = function(app, config) {

    var { graphqlHTTP } = require('express-graphql');
    const { makeExecutableSchema } = require("graphql-tools");
    
    var GameRecord = require("../database/game-record-model");

    // Construct a schema, using GraphQL schema language
    //var schema = buildSchema(`
       
   // `
    //seed: Integer!
    //level: Integer!
    //result: String!
    //easyMode: Boolean!
    //description: String
    //date: String
    //variant: String  
    //);
    
    const schemaFile = path.join(__dirname, "schema.graphql");
    const typeDefs = fs.readFileSync(schemaFile, "utf8");

    var filterGameRecords = function(gameRecords) {

        var filteredGameRecords = [];

        _.each(gameRecords, function(gameRecord) {

            var filteredRecord =
                _.pick(gameRecord,
                    '_id', 'username', 'score', 'seed', 'level', 'result', 'easyMode', 'description', 'date', 'variant');

            if('recording' in gameRecord && gameRecord.recording != undefined) {
                filteredRecord.recording = 'recording-' + gameRecord._id;
                filteredRecord.link = 'viewRecording/' + gameRecord.variant + "-" + gameRecord._id;
            }

            if('recording' in gameRecord && stats.doesVariantSupportRecordingDownloads(config, gameRecord.variant)) {
                filteredRecord.download = 'recordings/' + gameRecord._id;
            }

            filteredGameRecords.push(filteredRecord);
        });

        return filteredGameRecords;
    };

    const resolvers = {
        Query: {
          games: function(_, { username }) {
            return GameRecord.find({ username: username }, function (err, gameRecords) {
    
                if (err) return next(err);
    
                var gameRecordsFiltered = filterGameRecords(gameRecords);
    
                return gameRecordsFiltered;
            })
        }},
        Game: {
          id: game => game.id,
          username: game => game.username,
          score: game => game.score
        },
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true,
        })
    );

    // The root provides a resolver function for each API endpoint
    var root = {
        hello: () => {
            return 'Hello world!';
        },
    };
    
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
};