


const https = require("https");
const express = require("express");
const {servmapping,defport,ssl} = require('./serverconf');
const {readFileSync} = require('fs');
const path = require('path');

const app = express();
const server = https.createServer({
  "key": readFileSync(path.join(__dirname, ssl.key)),
  "cert": readFileSync(path.join(__dirname, ssl.cert))
},app);
const actport = process.env.port || defport;

for(let [key,val] of Object.entries(servmapping)) {
  app.use(key,express.static(path.join(__dirname, val)));
}

server.listen(actport, function(err){
  if(err) throw err;
  console.log(`Listening to internal port ${actport} `);
});