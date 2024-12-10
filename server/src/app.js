const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const loginRouter = require('./routes/login.router');
const addUserRouter = require('./routes/adduser.router');
const allUsersRouter = require('./routes/allusers.router');
const deleteUserRouter = require('./routes/delete.router');
const updatedRouter = require('./routes/update.router');
const registRouter = require('./routes/registration.router');
const allFarmsRouter = require('./routes/allfarms.router');

const app = express();

const corsConfig = {
  origin: ['http://localhost:5173'],
  credintials: true,
};

app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', loginRouter);
app.use('/', allUsersRouter);
app.use('/', deleteUserRouter);
app.use('/', addUserRouter);
app.use('/', updatedRouter);
app.use('/', registRouter);
app.use('/', allFarmsRouter);

module.exports = app;
