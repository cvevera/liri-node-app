require("dotenv").config();

var keys = require("./keys.js");
var SpotifyAPI = require("node-spotify-api");
var spotify = new SpotifyAPI(keys.spotify);
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
    axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp")
    .then(function(response){
        for(var i = 0; i < 5; i++){
            var concertData = [
                "Venue: " + response.data[i].venue.name,
                "Location: " + response.data[i].venue.city,
                "Event Date: " + response.data[i].datetime,
                "-------------------------------------",
            ].join("\n\n");
    console.log(concertData)}
})
    .catch(function (error) {
        console.log(error);
    });
};

// function spotifyThisSong() {
//     spotify.search({ type: 'track', query: parameter }, function (response) {
//         for (var i = 0; i < 5; i++) {
//             var spotifyData = [
//                 "Artist: " + response.tracks.items[i].artists[0].name,
//                 "Song Name: " + response.tracks.items[i].name,
//                 "Album Name: " + response.tracks.items[i].album.name,
//                 "Preview Link: " + response.tracks.items[i].preview_url,
//             ].join("\n\n");
//             console.log(spotifyData);
//         }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };

function movieThis() {
    // This makes the default parameter "Mr. Nobody"
    if (!parameter) {
        parameter = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            var movieData = [
                "Movie Title: " + response.data.Title,
                "Year of Release:" + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                "Country Produced: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors/Actresses: " + response.data.Actors].join("\n\n");
            console.log(movieData);
        })
        .catch(function (error) {
            console.log(error);
        });
};

function doWhatItSays() {
    
};
