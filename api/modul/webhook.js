const line = require('@line/bot-sdk');
const router = require('express').Router();

require('dotenv').config()
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(config);

let listphrases = [{
    phrases: 'สวัสดี',
    responses: 'สวัสดีครับ'
}]


router.post('/', line.middleware(config), (req, res) => {
    console.log(req.body);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    const filterValue = new RegExp('.*' + value.toLowerCase() + '.*');
    const messageresponse = listphrases.filter((function (item) {
        return filterValue.test(item.product_name.toLowerCase());
    }));

    console.log(messageresponse);

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

module.exports = router;