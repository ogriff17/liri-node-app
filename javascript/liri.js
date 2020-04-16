require("dotenv").config();
var keys = require("./keys.js");

var spotify = require('spotify') ;
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultSong = "Morgan Freeman";

function processCommands(inputCommand, commandParam){
    switch (inputcommand){
        case 'spotify-this-song':
            spotifyThis(commandParam);
            break;

            default:
                console.log("Invalid Command.");
    }
} 

function spotifyThis(song){
    if(song === ""){
        song = defaultSong;
    }
    spotify.search({type:'track', query:song}, function(err, data) {
        if (err){
            console.log('Error ' + err);
            return;
        }
    }

    )}


  /*   function bandsInTown () */

processCommands(inputCommand, commandParam);
