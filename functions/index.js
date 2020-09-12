const functions = require('firebase-functions');
const request = require('request');
const crypto = require('crypto');
const { send } = require('process');

exports.TradingFunction = functions
.https
.onRequest((req, res) => {

  //post request以外の通信の遮断
  if(req.method !== "POST"){
    res.status(405).send('Access Not Allowed');
    return;
  }

  //認証処理
  //firebase環境変数からapikeyとapisecretkeyを取得
  // const key=functions.config().api.key;
  // const secret=functions.config().api.secret;
  const key="5hkUCKBHMayFGvCM5EmpeE";
  const secret="t0nJw20TJR7PD2B4XZvk2/v6uhd1kuwVbUj55OaWJ/M=";

  let method="GET";
  let path="/v1/me/getpermissions";

  request(createOption(method,path,key,secret),(_err,_res,payload)=>{
    // console.log(payload);
  });

  res.send(req.body);
  // const body=JSON.stringify({
  //   product_code:"BTC_JPY",
  //   child_order_type:"LIMIT",
  //   side:"BUY",
  //   price:30000,
  //   size:0.1
  // });
});

function createOption(method,path,key,secret) {
  const timeStamp=Date.now().toString();
  const text=timeStamp+method+path;
  const sign=crypto.createHmac('sha256',secret).update(text).digest('hex');
  const options={
    url:'https://api.bitflyer.com'+path,
    method:method,
    headers:{
      'ACCESS-KEY':key,
      'ACCESS-TIMESTAMP':timeStamp,
      'ACCESS-SIGN':sign,
      'Content-Type': 'application/json'
    }
  };
  return options;
}