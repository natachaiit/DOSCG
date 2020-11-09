const line = require('@line/bot-sdk');
const router = require('express').Router();

require('dotenv').config()
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(config);

const listphrases = [{
    phrases: 'สวัสดี',
    responses: 'สวัสดีครับ'
}]


router.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    const filterValue = new RegExp('.*' + event.message.text.toLowerCase() + '.*');
    const messageresponse = listphrases.filter((function (item) {
        return filterValue.test(item.phrases.toLowerCase());
    }));
    if(messageresponse.length !== 0){
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: messageresponse[0].responses
        });
    }
    else{
        console.log('Not Havedata');
        return Promise.resolve(null);
    }
}

module.exports = router;