const CACHE = 'trip2026-v3';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => clients.claim())
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'Trip Alert',body:'Check dashboard!'};
  e.waitUntil(self.registration.showNotification(d.title,{body:d.body,vibrate:[200,100,200]}));
});
