const express = require('express');
const webpush = require('web-push');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());

const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);
app.use((_req, _res, next) => {
  console.log('I was hitted');
  next();
});
// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const body = req.body;
  const { subscription, title } = body;
  // Send 201 - resource created
  console.log('subscription', subscription);
  res.status(201).json({});
  let description;
  if (title === 'Delivered') {
    description = 'Your order have been delivered at your mention address.';
  }
  // Create payload
  const payload = JSON.stringify({
    title: title,
    description: description || 'description',
  });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 6555;

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);
