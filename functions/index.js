const functions = require('firebase-functions');
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.TradingFunction = functions
.https
.onRequest((request, response) => {
  let marketsResponse = axios.get("https://api.bitflyer.com/v1/markets")
  .then(res=>{
      response.send(res.data);
      return;
  })
  .catch(err=>{
      response.send(err);
  });
});