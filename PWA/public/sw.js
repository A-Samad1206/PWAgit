const staticCacheName = 'site-static-v3';
const dynamicCache = 'site-dynamic-v3';

const assets = [
  '/',
  '/index.html',
  '/pages/fallback.html',
  '/js/app.js',
  '/js/materialize.min.js',
  '/js/ui.js',
  '/js/db.js',
  '/css/materialize.min.css',
  '/css/styles.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v90/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
];
// 'https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js',
// 'https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js',
// 'https://www.gstatic.com/firebasejs/8.6.7/firebase-firestore.js',

//cache size limit function
const limitCacheSize = (name, size) => {
  // Looping
  caches.open(name).then((cache) => {
    cache.keys().then(async (keys) => {
      //   const newKey = keys[0].url.split('localhost:5500')[1];
      if (keys.length > size) {
        console.log('keyskeys', keys);
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install service work
self.addEventListener('install', (evt) => {
  // A service worker won't receive events like fetch and push until it successfully finishes installing and becomes "active".
  // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
  //By default, a page's fetches won't go through a service worker unless the page request itself went through a service worker. So you'll need to refresh the page to see the effects of the service worker.
  // self.skipWaiting();
  console.log('Installllllllllllllllllllll');
  // clients.claim();

  // Here we can load asset to cache to use in offline mode.
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

//active service worker
self.addEventListener('activate', (evt) => {
  // console.log('self.clients', clients.claim);
  // clients.claim();
  console.log('Activateeeeeeeeeeeee');
  // To dp cache management
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => {
            return caches.delete(key);
          })
      );
    })
  );
});

//fetch eventgg
self.addEventListener('fetch', (evt) => {
  console.log(evt.request.url, 'evt.request.mode', evt.request.mode);
  // console.log('Fetch', evt.request.url);
  // console.log('evt.request', evt.request.url);hh
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          // return (
          if (cacheRes) {
            // console.log('Found', evt.request.url);
            return cacheRes;
          } else {
            return fetch(evt.request).then((fetchRes) => {
              // console.log('NotFound', evt.request.url);
              const resClome = fetchRes.clone();
              return caches.open(dynamicCache).then((cache) => {
                cache.put(evt.request.url, resClome);
                // limitCacheSize(dynamicCache, 4);
                return fetchRes;
              });
            });
          }
          // );
        })
        .catch(() => {
          if (evt.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html');
          }
        })
    );
  }
  // else {
  //   fetch(evt.request).then((fetchRes) => fetchRes);
  // }
});
