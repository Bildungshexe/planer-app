/* Offline-Betrieb: zuerst aus dem Netz (immer die neueste Version), sonst aus dem Zwischenspeicher.
   Es werden nur die Programmdateien zwischengespeichert, nie Noten oder Planerdaten. */
var CACHE = 'lehrerplaner-v62';
var FILES = ['./', 'index.html', 'bewertung.html', 'vertretung.html', 'hilfe.html', 'pdfjs/laden.mjs', 'pdfjs/pdf.min.mjs', 'pdfjs/pdf.worker.min.mjs', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true });
  }));
});
