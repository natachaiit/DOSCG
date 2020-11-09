require('dotenv').config()
const line = require('@line/bot-sdk');
const router = require('express').Router();
const sockets = require('../libs/sockets');


// Setting Line
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(config);

const listphrases = [{
    phrases: 'สวัสดี',
    responses: 'สวัสดีครับ'
},
{
    phrases: 'หิว',
    responses: 'กินอะไรดีครับ'
}]


router.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(
            req.body.events.map(handleEvent)
        )
        .then((result) => res.json(result));
});

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    const filterValue = new RegExp('.*' + event.message.text.toLowerCase() + '.*');
    const messageresponse = listphrases.filter((function (item) {
        return filterValue.test(item.phrases.toLowerCase());
    }));
    if (messageresponse.length !== 0) {

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: messageresponse[0].responses
        });
    }
    else {
        client.getProfile(event.source.userId).then(data => {
            console.log(data);
        })
            .catch(e => {
                console.log(e);
            })
    }
    return Promise.resolve(null);
}

module.exports = router;