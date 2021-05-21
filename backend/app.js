const express = require('express');
const path = require('path');

//importing dotenv configuration
require('dotenv').config()

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require("mongoose");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data')
const cartItemsRouter = require('./routes/cartItems')

mongoose.connect(
    process.env.MONGODB_SERVER_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    function (err) {
        if (err) {
            console.log("err", err);
        } else {
            console.log("cconnected to DB successfully");
        }

    });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/cartItems', cartItemsRouter)

module.exports = app;
