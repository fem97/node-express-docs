const express = require('express');
const mongoose = require("mongoose");
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// express app initialization
const app = express();
app.use(express.json());

// database connect with mongoose
mongoose
    .connect("mongodb://localhost/todos")
    .then(() => console.log("connection successfull"))
    .catch(err => console.log(err))

// Application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);


// Default Error Handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler);

// listening server
app.listen(5001, () => console.log("Server running on port: 5000"));