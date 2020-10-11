require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const Router = express.Router;
const mongoClient = require('./_helpers/db');
const initApollo = require('./_helpers/init-apollo');

const app = express();

mongoClient(app)

app.use(express.static(path.join(__dirname, './client/build')));

app.set('env', process.env.NODE_ENV || 'development');
app.set('basePath',__dirname);
app.set('Router', Router);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/index')(app));

initApollo(app)

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
})

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = app;
