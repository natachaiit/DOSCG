const { Expression, Equation } = require('algebra.js');

const router = require('express').Router();

router.get('/', (req, res) => {
    let responedata = {
        datafirstsum : '',
        datasecondsum : '',
    }
    var expr = new Expression("x");
    expr = expr.add(21);


    var eq = new Equation(expr, 23);
    var datafirstsum = eq.solveFor("x");
    responedata.datafirstsum = datafirstsum.numer;

    var eq = new Equation(expr, -21);
    var datasecondsum = eq.solveFor("x");
    responedata.datasecondsum = datasecondsum.numer;
    res.status(200).json(responedata);
});

module.exports = router;