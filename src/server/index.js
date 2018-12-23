require('dotenv').config();
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://afac87ca33494e6e9b2c222ffd07259d@sentry.io/1357103' });

const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const RepoRouter = require('./RepoRouter');

const API_PORT = 3000;

const app = express();

app.use(timeout('10s'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(new RepoRouter());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('public'));
}

app.listen(API_PORT, function() {
	console.log(`Server listening on ${ API_PORT }`);
});
