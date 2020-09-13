// This file exposes the whole app as a library.

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


// Middleware for parsing json objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Production setup
// Serve static files from the React app
// Catch any other routes than the ones above - must be after all api routes
// if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('./build'));

    // const path = require('path');
    // app.get("*", function (req, res) {
    //     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    // })
// }

// Handle BW API routes
require('./routes/sales')(app);

module.exports = app;
