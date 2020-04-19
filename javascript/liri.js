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
       var queryUrl = "https://rest.bandsintown.com/artists/" + decodeURI(artist) + "/events?app_id=codingbootcamp";
   
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
    });



   }


processCommands(inputCommand, commandParam);
