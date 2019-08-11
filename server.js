// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// first API endpoint...
app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});

// timestamp api endpoint
app.get('/api/timestamp/:date_string?', function(req, res) {
    let input = req.params.date_string;
    // check if unix timestamp is just numbers
    if (!isNaN(input)) {
        input = parseInt(input);
    }
    // parse date string
    let date = new Date(input);

    // if no string passed
    if (!req.params.date_string) {
        date = new Date();
    }

    const unix = date.getTime();
    const utc = date.toUTCString();

    res.send({ unix, utc });
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});