require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

/* var spotify = new Spotify(keys.spotify); */
var spotify = require('node-spotify-api');   
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultSong = "Morgan Freeman";
var spotify = new spotify(keys.spotify);

function processCommands(inputCommand, commandParam){
    switch (inputCommand){
        case 'spotify-this-song':
            spotifyThis(commandParam)
            break;
        case 'concert-this':
            concertThis(commandParam)
            break;
        case 'movie-this':
            //console.log ("Here I am--once again!")
            movieThis(commandParam) 
            break; 
        default:
            console.log("Invalid Command." + inputCommand);
    }
} 

function spotifyThis(song){
    if(song === undefined){
        song = defaultSong;
    }
    spotify.search({type:'track', query:song}, function(err, data){
        if (err){
            console.log('Error ' + err);
            return;
        } 
        console.log(data);
        for(i=0; i < data.tracks.items.length; i++){
            var song = data.tracks.items[i];
            console.log('Album: ' + song.album.name);
    
                 for(j=0; j < song.artists.length; j++){
                console.log('  Artist: ' + song.artists[j].name); 
         }  
             } 
    }

    )}

    var  defaultArtist = "RKCB";
   function concertThis(artist){
       var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
   
        axios.get(queryUrl).then(
        function(response)
            {
        console.log("Upcoming Events: " + artist);
        console.log(response.data.length);
        for (i=0; i< response.data.length; i++)
        {
            console.log(" Venue : " + response.data[i].venue.name);
            console.log(" Country : " + response.data[i].venue.country);
            console.log(" City : " + response.data[i].venue.city);
            console.log(" Date : " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm a'));
            console.log("-----------------------");

        }
    })
    .catch(function(error){
        console.log(error);
    })
   }


var defaultMovie="Mr. Nobody";
function movieThis(movies){
    if (movies=== undefined){
    movies = defaultMovie;
    }
    axios.get("http://www.omdbapi.com/?t=" + movies + "&plot=short&apikey=trilogy")

    .then(function(response){
        console.log("Title:" + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
       
        for(j=0; j < response.data.Ratings.length; j++){
            if(response.data.Ratings[j].Source === "Rotten Tomatoes"){
               console.log("Rotten Tomatoes Rating: " + response.data.Ratings[j].Value); }
        }


        console.log("Country/Countries Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response. data.Plot);
        console.log("Cast: " + response.data.Actors);
    })

    .catch(function(error){
        console.log(error);
    })


}










    

processCommands(inputCommand, commandParam);
