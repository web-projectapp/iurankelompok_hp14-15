const CACHE_NAME = 'buku-kas-pwa-v1';

// Karena menggunakan iframe Google Apps Script, kita hanya membuat cache dasar
// agar browser mendeteksi bahwa ini adalah aplikasi PWA yang sah.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/icon.svg'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
