const CACHE_NAME = 'neuromind-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/mindmap.css',
  '/menu.css',
  '/mindmap.js',
  '/menu.js',
  '/utils.js',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
