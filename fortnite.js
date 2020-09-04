// nodejs
// assuming all necessary variables already exist. just a very, very simple poc

// see https://github.com/qlaffont/fortnite-api
const Fortnite = require("fortnite-api");

// Just a simple HTTP request package
const axios = require('axios')

// https://github.com/qlaffont/fortnite-api#init
let fortniteAPI = new Fortnite(
    [
        "EMAIL_ACCOUNT",
        "PASSWORD",
        "CLIENT LAUNCHER TOKEN",
        "FORTNITE CLIENT TOKEN"
    ]
);

// Create timer with 
let checkTimer = setInterval(function() { checkNewGames() }, 10000);
let oldMatches = -1;

fortniteAPI.login();

function checkNewGames() {
    fortniteAPI
        .getStatsBRFromID("fortnite_target_id_here", "pc")
        .then(stats => {
            if (oldMatches === -1) { // We just started, need to set up
                oldMatches = stats.lifetimeStats.matches;
                return;
            }
            if (stats.lifetimeStats.matches !== oldMatches) {
                oldMatches = stats.lifetimeStats.matches;
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
            }
        })
        .catch(err => {
            console.log(err);
        });
};
