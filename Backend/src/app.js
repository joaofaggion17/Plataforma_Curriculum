const express = require('express');
const cors = require('cors');

// Usuários
const userRoutes = require('./routes/user-routes');

// Currículos
const curriculumRoutes = require('./routes/curriculum-routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userRoutes);

app.use('/curriculum', curriculumRoutes);

module.exports = app;