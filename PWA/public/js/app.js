if ('serviceWorker' in navigator) {
  // if (navigator.serviceWorker.controller) {
  //   console.log(
  //     `This page is currently controlled by: ${JSON.stringify(
  //       navigator.serviceWorker.controller
  //     )}`
  //   );
  //   // console.log(navigator.serviceWorker.controller);
  // } else {
  //   console.log('This page is not currently controlled by a service worker.');
  // }

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // This fires when the service worker controlling this page
    // changes, eg a new worker has skipped waiting and become
    // the new active worker.
    console.log('controllerchange', navigator.serviceWorker.controller);
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // reg.update();
      // console.log('reg.installing', reg.installing);
      // console.log('reg.waiting', reg.waiting);
      // console.log('reg.active', reg.active);
      // reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      // const newWorker = reg.installing;
      // console.log('updatefound', newWorker.state);
      // "installing" - the install event has fired, but  not yet complete
      // "installed"  - install complete
      // "activating" - the activate event has fired, but not yet complete
      // "activated"  - fully active
      // "redundant"  - discarded. Either failed install, or it's been
      //                replaced by a newer version
      //   newWorker.addEventListener('statechange', () => {
      //     // newWorker.state has changed
      //     console.log('stateChange', newWorker.state);
      //   });
      // });
    });
  });
}
function show(obj) {
  for (x in obj) {
    console.table({ x, ...obj[x] });
  }
}
