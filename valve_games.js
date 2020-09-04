// nodejs
// assuming all necessary variables already exist. just a very, very simple poc

// this one's already tried and tested for dota2. csgo should work pretty much the same maybe very minor changes are needed

var d2gsi = require('dota2-gsi');
var server = new d2gsi();

// Just a simple HTTP request package
const axios = require('axios')

const correctAuth = process.argv.slice(2)[0]; // Pass correct token as argument. probably better to read from file or something

server.events.on('newclient', function(client) {
    client.on('map:win_team', function(team) {
        if (client.auth.token != correctAuth) {
            return;
        }

        if (client.gamestate.map.customgamename !== '' || 'team2' in client.gamestate.player) {
            return;
        }

        axios({
            method: "post",
            url: "https://api.twitch.tv/helix/channels/commercial", 
            data: {
                "broadcaster_id": broadcaster_id,
                "length": 30 // 30, 60, 90, 120, 150, 180
            },
            headers: {
                "Client-ID": client_id,
                "Authorization":  "Bearer " + oauth_token
            }
        });
    })
});
