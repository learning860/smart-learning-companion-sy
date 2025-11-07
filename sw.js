// Service Worker 用于离线支持
const CACHE_NAME = 'smart-learning-companion-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap',
    'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 返回缓存的版本或网络请求
                return response || fetch(event.request);
            }
        )
    );
});
