const express = require('express');
const app = express();

const mongoose = require('mongoose');
const users = require('../server/controllers/UserController.js');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', users);

const PORT = process.env.PORT || 5000;

const uri = 'mongodb://localhost:27017/users';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${uri}`));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});