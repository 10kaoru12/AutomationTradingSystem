const functions = require('firebase-functions');
const axios = require('axios');
const request = require('request');
const crypto = require('crypto');

exports.TradingFunction = functions
.https
.onRequest((request, response) => {

  //post request以外の通信の遮断
  if(request.method !== "POST"){
    response.status(405).send('Access Not Allowed');
    return;
  }

  axios.get("https://api.bitflyer.com/v1/markets")
  .then(res=>{
    response.send(res.data);
    return;
  })
  .catch(err=>{
    response.send(err);
    return;
  });

  //認証処理
  //firebase環境変数からapikeyとapisecretkeyを取得
  // const key=functions.config().api.key;
  // const secret=functions.config().api.secret;
  const timeStanp=Date.now().toString();
  const method="POST";
  const path="https://api.bitflyer.com/v1/me/sendchildorder";
  const body=JSON.stringify({
    product_code:"BTC_JPY",
    child_order_type:"LIMIT",
    side:"BUY",
    price:30000,
    size:0.1
  });
});