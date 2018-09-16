require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
var getArtists = function(artist) {
    return artist.name;
};

// Function for running a Spotify search
var seekingSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search(
        {
        type: "track",
        query: songName
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtists));
                console.log("song name: " + songs[i].name);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

var moviePosts = function(movie) {
    if (movie === undefined) {
      movie = "facts";
    }
  
    var urlAPI =
      "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    request(urlAPI, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      }
    });
  };
  

var pick = function(caseData, functionData) {
    switch (caseData) {
    case "movie-this":
      moviePosts(functionData);
      break;
    case "spotify-this-song":
      seekingSpotify(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:  
      console.log("LIRI no comprendo");
    }
  };
  
  // Function which takes in command line arguments and executes correct function accordingly
  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  // MAIN PROCESS
  // =====================================
  runThis(process.argv[2], process.argv.slice(3).join(" "));
  