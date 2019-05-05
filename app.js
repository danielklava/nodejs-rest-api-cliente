const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const logger = require('morgan');
const cors = require('cors');

const models = require('./app/models/index');
const jwtMW = exjwt({ secret: 'private-key' });

const app = express();
const restApi = require('./app/routes/api/clientes.js');

app.use(cors());
//app.options('*', cors());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', jwtMW, (req, res) => { res.send('Você está autenticado'); });
app.use('/api/v1/', restApi);

// Error handling 
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type,Authorization,Accept');
    next();
});

models.sequelize.sync();

module.exports = app;