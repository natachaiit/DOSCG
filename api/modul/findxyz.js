const router = require('express').Router();
const redis = require('redis');
const { promisify } = require('util');

const clientredis = redis.createClient();
const getAsync = promisify(clientredis.get).bind(clientredis)

router.get('/', async (req, res) => {
    const cached = await getAsync('findxyz')
    if(cached){
        return res.status(200).json(JSON.parse(cached));
    }

    let listdata = [];
    let loopset = 7;
    let last = 3;
    for (let index = 0; index < loopset; index++) {
        listdata.push(last)
        last = last + (index * 2);
    }

    //set expire keep data
    clientredis.setex('findxyz', 60, JSON.stringify(listdata));
    res.status(200).json(listdata);
});

module.exports = router;