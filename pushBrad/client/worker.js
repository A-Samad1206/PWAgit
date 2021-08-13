console.log('Service Worker Loaded...');

self.addEventListener('push', (e) => {
  const { title, description } = e.data.json();

  // fetch('https://jsonplaceholder.typicode.com/posts').then((data) => {
  //   data.json().then((d) => {
  //     console.log('Data', d);
  //   });
  // });
  self.registration.showNotification(title, {
    body: description,
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png',
  });
});
