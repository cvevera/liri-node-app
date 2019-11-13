require("dotenv").config();

var keys = require("./keys.js");
var spotifyAPI = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require("axios");
var fs = require("fs");

var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ");

// Determines the command selected...
// Based on the command we run the appropriate function
switch (command) {
    case "concert-this":
        concertThis(parameter);
        break;
    case "spotify-this-song":
        spotifyThisSong(parameter);
        break;
    case "movie-this":
        movieThis(parameter);
        break;
    case "do-what-it-says":
        doWhatItSays(parameter);
        break;
};

function concertThis() {
    console.log("Concert this " + parameter)
};

function spotifyThisSong() {
    console.log("Spotify this " + parameter)
};

function movieThis() {
    console.log("Movie this " + parameter)
};

function doWhatItSays() {
    console.log("Do what " + parameter + " says!")
};
