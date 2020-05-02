const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const recipeRoutes = require('./routes/recipeRoutes');

app.use('/', recipeRoutes);

module.exports = app;
