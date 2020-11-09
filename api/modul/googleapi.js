const router = require('express').Router();

require('dotenv').config()
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const {getAsync, clientredis} = require('../libs/redis')

router.get('/', async (req, res) => {
    const cached = await getAsync('waygoto')
    if(cached){
        return res.status(200).json(JSON.parse(cached));
    }
    
    client.directions(
        {
            params: {
                origin: 'SCG สำนักงานใหญ่ บางซื่อ',
                destination: 'เซ็นทรัลเวิลด์',
                language: 'en',
                alternatives : true,
                key: process.env.GOOGLE_MAPS_API_KEY
            }, timeout: 1000,
        })
        .then(response => {
            let directions = [];
            let listdata = response.data.routes;
            listdata.forEach(element => {
                directions.push(
                    {
                        distance: element.legs[0].distance.text,
                        duration: element.legs[0].duration.text,
                        summary: element.summary
                    }
                )
            });
            directions.sort((a, b) => b.duration - a.duration);

            //set expire keep data
            clientredis.setex('waygoto', 360, JSON.stringify(directions));
            res.status(200).json(directions);
        })
        .catch(error => {
            res.status(400).json(error);
        })
});

module.exports = router;