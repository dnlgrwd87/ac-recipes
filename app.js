const express = require('express');
const logger = require('morgan');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', recipeRoutes);

module.exports = app;
