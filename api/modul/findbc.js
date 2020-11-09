const { Expression, Equation } = require('algebra.js');
const router = require('express').Router();
const redis = require('redis');
const {getAsync, clientredis} = require('../libs/redis')

router.get('/', async (req, res) => {
    const cached = await getAsync('findbc')
    if(cached){
        return res.status(200).json(JSON.parse(cached));
    }

    let responedata = {
        datafirstsum: '',
        datasecondsum: '',
    }
    var expr = new Expression("x");
    expr = expr.add(21);

    // Substituting the equation
    var eq = new Equation(expr, 23);
    var datafirstsum = eq.solveFor("x");
    responedata.datafirstsum = datafirstsum.numer;

    var eq = new Equation(expr, -21);
    var datasecondsum = eq.solveFor("x");
    responedata.datasecondsum = datasecondsum.numer;

    //set expire keep data
    clientredis.setex('findbc', 60, JSON.stringify(responedata));
    res.status(200).json(responedata);
});

module.exports = router;