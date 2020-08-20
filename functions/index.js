const functions = require('firebase-functions');
const axios = require('axios');
const request = require('request');
const crypto = require('crypto');

exports.TradingFunction = functions
.https
.onRequest((request, response) => {
  axios.get("https://api.bitflyer.com/v1/markets")
  .then(res=>{
    response.send(res.data);
    return;
  })
  .catch(err=>{
    response.send(err);
    return;
  });
});

function (){

}