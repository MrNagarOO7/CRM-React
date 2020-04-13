const express = require('express');
const bodyParser = require('body-parser'); //Parse Request Body
const path = require('path');
const cors = require('cors'); // For Cross-Origin-request
const nocache = require('nocache'); //Allow No caching
const helmet = require('helmet'); //Secure express headers
const winston = require('winston');

// Global Declaration
global._ = require('lodash'); //For Default functionality
global.logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.printf(info => {
        return `${info.timestamp} [${info.level}] : ${info.message}`;
      })
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new (winston.transports.File)({
      name: 'file.info',
      filename: './logs/info.log',
      level: 'info',
    }),
    new (winston.transports.File)({
      name: 'file.error',
      filename: './logs/error.log',
      level: 'error',
    })
  ]
});

// App Configuration Module
const config = require('./config/index');
const routes = require('./routes');
const app = express();

// Middleware
app.use(cors());
app.use(nocache());
app.use(helmet());

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(function(req, res, next) {

  if(req.body && false){
    console.log(`Request Body:`, req.body);
  }

  let res_code = "";
  if(req.query['res_code']){
    res_code = req.query['res_code'];
  }
  res.res_code = res_code;

  var origin = '*'; //Default Origin
  if (req.headers.origin) {
    origin = req.headers.origin;
  }

  res.header("Access-Control-Allow-Origin", origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token, Timestamp, X-Requested-With, Authorization");
  res.header('Access-Control-Allow-Credentials', true);

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

routes.initialize(app);
let listingport = process.env.PORT ? process.env.PORT : 9001;

const server = app.listen(listingport,() => {
  logger.info(`Server Listening on ${listingport}`);
  console.log(`Server Listening on ${listingport}`);
});