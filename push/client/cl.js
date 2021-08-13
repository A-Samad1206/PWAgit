const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  var serviceWorker;
  if (register.installing) {
    serviceWorker = register.installing;
    // console.log('Service worker installing');
  } else if (register.waiting) {
    serviceWorker = register.waiting;
    // console.log('Service worker installed & waiting');
  } else if (register.active) {
    serviceWorker = register.active;
    // console.log('Service worker active');
  }
  let subscription;
  if (serviceWorker) {
    console.log('sw current state', serviceWorker.state);
    if (serviceWorker.state == 'activated') {
      //If push subscription wasnt done yet have to do here
      console.log('sw already activated - Do watever needed here');
    }
    serviceWorker.addEventListener('statechange', async function (e) {
      console.log('sw statechange : ', e.target.state);
      if (e.target.state == 'activated') {
        console.log('****************************');
        // use pushManger for subscribing here.
        console.log(
          'Just now activated. now we can subscribe for push notification'
        );
        console.log('Registering Push...');
        subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        console.log('Push Registered...');
        // subscribeForPushNotification(reg);
        // Send Push Notification
        console.log('Sending Push...');

        await fetch('/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-type': 'application/json',
          },
        });
        console.log('Push Sent...');
      }
    });
  }
  console.log('Service Worker Registered...');
  console.log('register', register);
  // Register Push
  // console.log('Registering Push...');
  // const subscription = await register.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  // });
  // console.log('Push Registered...');
  register.addEventListener('updatefound', () => {
    // A wild service worker has appeared in register.installing!

    const newWorker = register.installing;
    console.log('updatefound', newWorker.state);
    newWorker.addEventListener('statechange', () => {
      console.log('stateChange', newWorker.state);
    });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
