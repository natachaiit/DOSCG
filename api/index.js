const express = require('express'),
    logger = require('morgan'),
    app = express(),
    bodyParser = require('body-parser');

app.use(logger('dev'));

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// If another body parser already parsed a request's body, 
// the webhook middleware cannot access to the raw body of the request. 
// The raw body should be retrieved for signature validation.
app.use('/webhook', require('./modul/webhook'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).send("OK")
});


app.use('/findxyz', require('./modul/findxyz'))
app.use('/findbc', require('./modul/findbc'))
app.use('/googleapi', require('./modul/googleapi'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    res.json({ message: 'Not found' });
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: 'Server Error' });
    console.log(err);
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port: ${process.env.PORT || 3000}`);
})