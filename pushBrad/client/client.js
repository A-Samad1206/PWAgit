const btn = document.querySelector('.btn');
const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';

// Check for service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    send().catch((err) => console.error(err));
  });
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  let subscription = false;
  console.log('Service Worker Registered...');
  register.addEventListener('updatefound', () => {
    console.log('updatefound');
    const newWorker = register.installing;
    newWorker.addEventListener('statechange', async () => {
      // newWorker.state has changed
      if (newWorker.state === 'activated') {
        subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
      }
    });
  });
  console.log('Registering Push...');

  console.log('Push Registered...');

  // Send Push Notification
  btn.onclick = async () => {
    console.log('Pre');
    if (!subscription) return;
    console.log('Sending Push...');
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify({ subscription, title: 'Delivered' }),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log('Push Sent...');
  };
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
