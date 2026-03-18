const CACHE = 'trip-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/index.html'))));
});
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'Trip Alert', body:'Check your dashboard!'};
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body, icon: '/icon.svg', badge: '/icon.svg',
    vibrate: [200, 100, 200], tag: 'trip-alert', renotify: true,
    data: d
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
