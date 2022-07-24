// Object containing global constants for server program

var path = require("path");

var config = {
  port: {
    HTTP: 8080,
  },
  brogueVariants: {
    BROGUECEV111: {
      binaryPath: "binaries/brogue-ce111",
      version: "1.11.1",
      versionGroup: "1.10.x",
      modernCmdLine: true, //Uses v1.8.x+ standard command line
      supportsDownloads: true, //Replays should work with desktop version
    },
  },
  defaultBrogueVariant: "BROGUECEV110",
  path: {
    CLIENT_DIR: path.normalize(__dirname + "/../client/"),
    GAME_DATA_DIR: path.normalize(__dirname + "/../game-data/"),
  },
  db: {
    url: "mongodb://mongo:27017/brogue",
  },
  lobby: {
    UPDATE_INTERVAL: 1000,
    TIMEOUT_INTERVAL: 300000,
  },
  auth: {
    secret: "asecret",
    tokenExpiryTime: 90 * 24 * 60 * 60 * 1000,
  },
};

module.exports = config;
