const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const subscriptionHandler = require('./subscriptionHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const origin = 'http://localhost:9000';
// app.use(
//   cors({
//     origin(origin, cb) {
//       const whitelist = process.env.CORS_ORIGIN
//         ? process.env.CORS_ORIGIN.split(',')
//         : [origin];
//       cb(null, whitelist.includes(origin));
//     },
//     credentials: true,
//   })
// );
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post(
  '/subscription',
  subscriptionHandler.handlePushNotificationSubscription
);
app.get('/subscription/:id', subscriptionHandler.sendPushNotification);

module.exports = app;
