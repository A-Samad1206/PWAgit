const express = require('express');
const webPush = require('web-push');
const cors = require('cors');
const path = require('path');
const vapidKeys = webPush.generateVAPIDKeys();
const app = express();
//Set static path
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());
// console.log('vapidKeys', vapidKeys);
const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM';

webPush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);
app.get('/', (req, res) => {
  res.json({ OK: 'OKKKKKKKK' });
});
// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get Push Subscription Obj
  console.log('Subssdwbhjwe');
  const subscription = req.body;
  console.log('subscription', subscription);
  //Send 201 - resouce created
  res.status(201).json({});

  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass Object int SendNotification

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error('Erroreeeeeeeeee', err));
});
app.listen(3333, () => console.log(`Server started on port 3333`));
