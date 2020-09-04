// nodejs
// assuming all necessary variables already exist. just a very, very simple poc


// see https://github.com/Lierrmm/Node-CallOfDuty. should also work for other cod games
// Platform options for warzone are psn (playstation network), xbl (Xbox Live), and battle (Battle.net actiblizzard launcher)
const CODApi = require('call-of-duty-api') ( { platform: "battle"} );

// Just a simple HTTP request package
const axios = require('axios')


// Create timer with 
let checkTimer = setInterval(function() { checkNewGames() }, 10000);
let oldMatches = -1;

// any activision account
CODApi.login(email, password);

function checkNewGames() {
    CODApi
        .MWBattleData(targetID)
        .then(stats => {
			// in addition to br_all br_dmz and just br also exist
            if (oldMatches === -1) { // We just started, need to set up
                oldMatches = stats.br_all.gamesPlayed;
                return;
            }
            if (stats.br_all.gamesPlayed !== oldMatches) {
                oldMatches = stats.br_all.gamesPlayed;
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
