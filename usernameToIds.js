require('dotenv').config();

var fs = require('fs');
var request = require('request');
if( process.argv.length < 3 ) {
  console.log( "Please pass in the name of the channel as an argument" );
  return;
}

var channel = process.argv[ 2 ];
request({
    url: 'https://tmi.twitch.tv/group/user/' + channel + '/chatters'
  },
  (err, r, b) => {
    var chatgroups = JSON.parse( b ).chatters;
    var chatters = Object.keys( chatgroups ).map( x => chatgroups[ x ].join(" ") ).join( " " ).split(" ").filter( x => x ).slice(0, 100).join( "," );
    console.log( chatters );
    request({
        url: 'https://api.twitch.tv/kraken/users?login=' + chatters,
        headers: {
          'Client-ID': process.env.Client_ID,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      },
      (error, response, body) => {
        if(!error) {
          var users = JSON.parse(body);
          var ids = users.users.map(x => x._id);
          console.log( ids.join(",") );
          fs.writeFileSync( "userids.txt", ids.join(",") );
        }
    });
});
