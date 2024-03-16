// // install service worker
self.addEventListener('install', (event) => {
    console.log('serviceWorker install successfully => ', event);
    event.waitUntil(
        caches.open('pwa-caches')
            .then(cache => cache.addAll(["../js/app.js", "../css/main.css"]))
            .catch(error => console.log('cache not saved => ', error))
    );
    self.skipWaiting() // auto reload when change service worker
})

// // activate service worker 
self.addEventListener('activate', (event) => {
    console.log('serviceWorker activate successfully => ', event);
})

// // fetch all assets to link the project
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(response => {
//                 console.log('response => ', response);
//                 if (response) {
//                     console.log('run whit cache request');
//                     return response;
//                 } else {
//                     console.log('run whit fetch request');
//                     return fetch(event.request);
//                 }
//             })
//     );
// });



