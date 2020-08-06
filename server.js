'use strict';
   
const express = require('express')
const app = express()
const line = require('@line/bot-sdk');
  
// create LINE SDK config from env variables
const config = {
  // 連結line
  channelAccessToken: "6/5F96gZjwd9qS5p57w0mFqdgAb0fpqyf40RGAFIsl1reBIe/66XqfB3rQgphXiRpG78k/RNE6hwoHD5Etd6B4XuXaucL7uV/XB+pbQe9oFA6f96sL44GuVT13sshjhyrwKbGT+Bbm72bgVZa9LSqgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "ae8ff3fd6d947037fb398a5bd0f72518",
};

// create LINE SDK client
const client = new line.Client(config);
  
// create Express app
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
  
// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  
  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
  
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}
  
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});