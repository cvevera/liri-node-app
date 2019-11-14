require("dotenv").config();

var keys = require("./keys.js");

var SpotifyAPI = require("node-spotify-api");
var spotify = new SpotifyAPI(keys.spotify);

var moment = require('moment');
moment().format("MM/DD/YYYY");

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
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
                var timeFormat = moment(response.data[i].datetime).format("MM/DD/YYYY");

                var concertData = [
                    "-------------------------------------",
                    "Venue: " + response.data[i].venue.name,
                    "Location: " + response.data[i].venue.city,
                    "Event Date: " + timeFormat,
                    " ",
                ].join("\n\n");
                console.log(concertData)
                fs.appendFile("log.txt", concertData, function(err) {});
        }})
        .catch(function (error) {
            console.log(error);
        });
};

function spotifyThisSong() {
    spotify.search({ type: 'track', query: parameter })
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
                var spotifyData = [
                    "----------------------------------------",
                    "Artist: " + response.tracks.items[i].artists[0].name,
                    "Song Name: " + response.tracks.items[i].name,
                    "Preview Link: " + response.tracks.items[i].preview_url,
                    "Album Name: " + response.tracks.items[i].album.name,
                    " ",
                ].join("\n\n");
                console.log(spotifyData);
                fs.appendFile("log.txt", spotifyData, function(err) {});
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    //     spotify
    //   .search({ type: 'track', query: parameter })
    //   .then(function(response) {
    //     console.log(response.tracks.items[0]);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
};

function movieThis() {
    // This makes the default parameter "Mr. Nobody"
    if (!parameter) {
        parameter = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            var movieData = [
                "----------------------------------------",
                "Movie Title: " + response.data.Title,
                "Year of Release:" + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                "Country Produced: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
                " ",
            ].join("\n\n");
            console.log(movieData);
            fs.appendFile("log.txt", movieData, function(err) {});
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Each function is present within doWhatItSays, so any command and parameter written in the random.txt file can work. (Not efficient but it works!)
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, result) {
        var fileCommand = result.split(",");

        if (fileCommand[0] === "spotify-this-song") {
            spotify.search({ type: 'track', query: fileCommand[1] })
                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        var spotifyData = [
                            "----------------------------------------",
                            "Artist: " + response.tracks.items[i].artists[0].name,
                            "Song Name: " + response.tracks.items[i].name,
                            "Preview Link: " + response.tracks.items[i].preview_url,
                            "Album Name: " + response.tracks.items[i].album.name,
                            " ",
                        ].join("\n\n");
                        console.log(spotifyData);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if (fileCommand[0] === "concert-this") {
            axios.get("https://rest.bandsintown.com/artists/" + fileCommand[1] + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        var timeFormat = moment(response.data[i].datetime).format("MM/DD/YYYY");

                        var concertData = [
                            "Venue: " + response.data[i].venue.name,
                            "Location: " + response.data[i].venue.city,
                            "Event Date: " + timeFormat,
                            "-------------------------------------",
                        ].join("\n\n");
                        console.log(concertData)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if (fileCommand[0] === "movie-this") {
            axios.get("https://www.omdbapi.com/?t=" + fileCommand[1] + "&y=&plot=short&apikey=trilogy")
                .then(function (response) {
                    var movieData = [
                        "----------------------------------------",
                        "Movie Title: " + response.data.Title,
                        "Year of Release:" + response.data.Year,
                        "IMDB Rating: " + response.data.imdbRating,
                        "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                        "Country Produced: " + response.data.Country,
                        "Language: " + response.data.Language,
                        "Plot: " + response.data.Plot,
                        "Actors: " + response.data.Actors,
                        " ",
                    ].join("\n\n");
                    console.log(movieData);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
    })

};
