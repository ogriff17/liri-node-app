require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Logtext;

/* var spotify = new Spotify(keys.spotify); */
var spotify = require("node-spotify-api");
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultSong = "Morgan Freeman";
var spotify = new spotify(keys.spotify);

function processCommands(inputCommand, commandParam) {
  switch (inputCommand) {
    case "spotify-this-song":
      spotifyThis(commandParam);
      break;
    case "concert-this":
      concertThis(commandParam);
      break;
    case "movie-this":
      movieThis(commandParam);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      LogIt((Logtext = "Invalid Command." + inputCommand));
  }
}

function spotifyThis(song) {
  if (song === undefined) {
    song = defaultSong;
  }
  spotify.search({ type: "track", query: song }, function (err, data) {
    if (err) {
      LogIt((Logtext = "Error " + err));
      return;
    }

    for (i = 0; i < data.tracks.items.length; i++) {
      var song = data.tracks.items[i];
      LogIt((Logtext = "Album: " + song.album.name));

      for (j = 0; j < song.artists.length; j++) {
        LogIt((Logtext = "Artist: " + song.artists[j].name));
      }
    }
  });
}

var defaultArtist = "RKCB";
function concertThis(artist) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function (response) {
      LogIt((Logtext = "Upcoming Events: " + artist));

      for (i = 0; i < response.data.length; i++) {
        LogIt((Logtext = "Venue : " + response.data[i].venue.name));
        LogIt((Logtext = "Country : " + response.data[i].venue.country));
        LogIt((Logtext = "City : " + response.data[i].venue.city));
        LogIt(
          (Logtext =
            "Date : " +
            moment(response.data[i].datetime).format("MMMM Do YYYY, h:mm a"))
        );
        LogIt((Logtext = "-----------------------"));
      }
    })
    .catch(function (error) {
      LogIt((Logtext = error));
    });
}

var defaultMovie = "Mr. Nobody";
function movieThis(movies) {
  if (movies === undefined) {
    movies = defaultMovie;
  }
  axios
    .get("http://www.omdbapi.com/?t=" + movies + "&plot=short&apikey=trilogy")

    .then(function (response) {
      LogIt((Logtext = "Title:" + response.data.Title));
      LogIt((Logtext = "Year Released: " + response.data.Year));
      LogIt((Logtext = "IMDB rating: " + response.data.imdbRating));

      for (j = 0; j < response.data.Ratings.length; j++) {
        if (response.data.Ratings[j].Source === "Rotten Tomatoes") {
          LogIt(
            (Logtext =
              "Rotten Tomatoes Rating: " + response.data.Ratings[j].Value)
          );
        }
      }

      LogIt((Logtext = "Country/Countries Produced: " + response.data.Country));
      LogIt((Logtext = "Language: " + response.data.Language));
      LogIt((Logtext = "Plot: " + response.data.Plot));
      LogIt((Logtext = "Cast: " + response.data.Actors));
    })

    .catch(function (error) {
      LogIt((Logtext = error));
    });
}
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    data = data.split(",");
    var inputCommand = data[0];
    var commandParam = data[1];
    LogIt((Logtext = commandParam));
    processCommands(inputCommand, commandParam);
  });
}

function LogIt(logtext) {
  console.log(Logtext);
  fs.appendFile("log.txt", Logtext + "\n", function (err) {
    if (err) console.log("Error logging data to file" + err);
  });
}

processCommands(inputCommand, commandParam);
