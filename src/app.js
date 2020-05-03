const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const recipeRoutes = require('./routes/recipeRoutes');
const materialRoutes = require('./routes/materialRoutes');

const swaggerUi = require('swagger-ui-express');
const { swaggerDocument } = require('./swagger-ui/swagger');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/recipes', recipeRoutes);
app.use('/materials', materialRoutes);
app.use('*', (req, res) => res.redirect('/docs'));

module.exports = app;
