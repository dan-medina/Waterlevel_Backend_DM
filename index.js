// index.js
// This is our main server file
//Test
// include express
const express = require("express");
// create object to interface with express
const app = express();

const fetch = require("cross-fetch");

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log("got request",req.url);
  next();
})

app.use(express.json());


app.post('/query/postCDECData', async function(req, res, next) {
  console.log("getting data");
  let water = await lookupWaterData(req.body);
  res.json(water);
  
});
// No static server or /public because this server
// is only for AJAX requests

// respond to all AJAX querires with this message
app.use(function (request, response) {
  response.status(404);
  response.send("Backend does not show a Web page");
})

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function lookupWaterData(date) {
  const api_url = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=${date.year}-${date.month}-01&End=${date.year}-${date.month}-01`;

  let fetch_response = await fetch(api_url);

  let result = fetch_response.json();

  return result; 
}