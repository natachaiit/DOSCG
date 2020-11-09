const router = require('express').Router();

router.get('/', (req, res) => {
    let listdata = [];
    let loopset = 7;
    let last = 3;
    for (let index = 0; index < loopset; index++) {
        listdata.push(last)
        last = last + (index * 2);
    }
    res.status(200).json(listdata);
});

module.exports = router;