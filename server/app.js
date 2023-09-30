require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes');
const {STATIC_PATH} = require('./config/path.config');

const app = express();

app.use(cors());
app.use(express.static(STATIC_PATH))
app.use(express.json());

app.use('/api', router);

module.exports = app;

