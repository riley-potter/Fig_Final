var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var groupID="145e7bbe3e78c4c348d3c2a08b";
var x=0;
var search="@CSFigGroup 9";

function writeMessage(message) {
  request.post('https://api.groupme.com/v3/bots/post?bot_id=' + groupID + '&text=' + message);
}

function sendGroup(){
  writeMessage("next step");
}

var Twit = require('twit');

var twitBot = new Twit({
    consumer_key: 'vkwmowsKdSLiT8ZmkHvSbLrWr',
    consumer_secret: 'x1cHX39dm6dPasofHOBrYDnsQ2e90AaeZEFQ05u2lrHNDg632m',
    access_token: '2887874473-wint2gA6cOd98UtRpDbUJ66XX3mWirH9Pr0QyrJ',
    access_token_secret: 'D9Jb0nTkHFUnw2cwuSKlFzPkSfV931z4z5njZpA3owIP1'
});

setInterval(function() {
  console.log("starting search");
  
  twitBot.get('users/show', { screen_name: '@CSFigGroup', count:100 }, function(err, data, response) {
 console.log("searching screen name");
  if(err){
    console.log(err);
  }
  if(data.status.text == search){
    console.log("found a match");
    sendGroup();
    console.log("sent message");
    x+=1;
  }
  if(x==1){
    setInterval(function() {
      process.exit(0);
    },3000);
    console.log("exited program");
  }
  
});

},5000);
