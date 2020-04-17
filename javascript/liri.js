require("dotenv").config();
var keys = require("./keys.js");

/* var spotify = new Spotify(keys.spotify); */
var spotify = require('node-spotify-api');   
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultSong = "Morgan Freeman";
var spotify = new spotify(keys.spotify);

function processCommands(inputCommand, commandParam){
    switch (inputCommand){
        case 'spotify-this-song':
            spotifyThis(commandParam);
            break;
            default:
                console.log("Invalid Command." + inputCommand);
    }
} 

function spotifyThis(song){
    if(song === undefined){
        song = defaultSong;
    }
    spotify.search({type:'track', query:song}, function(err, data) {
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


  /*   function bandsInTown () */

processCommands(inputCommand, commandParam);
