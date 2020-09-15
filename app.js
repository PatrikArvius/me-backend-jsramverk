'use strict';

const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 1337;
const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');

app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // parsing application/x-www-form-urlencoded

// Enables cross-origin resource sharing
app.use(cors());
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Routes
app.use("/", index);
app.use("/reports", reports);
app.use("/register", register);
app.use("/login", login);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
