/* eslint-disable no-console */

const { assets } = global.serviceWorkerOption;
const CACHE_NAME = new Date().toISOString();

let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map(path => (
    new URL(path, global.location).toString()
));

self.addEventListener('install', (event) => {
    console.log('[SW] Install event');

    event.waitUntil(
        Promise.all([
            self.skipWaiting(),
            global.caches
                .open(CACHE_NAME)
                .then(cache => cache.addAll(assetsToCache))
                .then(() => {
                    console.log('Cached assets: main', assetsToCache);
                }).catch((error) => {
                    console.error(error);
                    throw error;
                })
        ])
    );
});

// After the install event.
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate event');

    // Clean the caches
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            global.caches.keys().then(cacheNames => (
                Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete the caches that are not the current one.
                        if (cacheName.indexOf(CACHE_NAME) === 0) {
                            return null;
                        }

                        return global.caches.delete(cacheName);
                    })
                )
            ))
        ])
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Ignore non-GET requests.
    if (request.method !== 'GET') {
        console.log(`[SW] Ignoring non-GET request ${request.method}`);
        return;
    }

    const requestUrl = new URL(request.url);

    // Ignore cross-origin requests.
    if (requestUrl.origin !== location.origin) {
        console.log(`[SW] Ignoring cross-origin request ${requestUrl.href}`);
        return;
    }

    // Ignore API calls.
    if (requestUrl.pathname.indexOf('/api/') !== -1) {
        console.log(`[SW] Ignoring API call ${requestUrl.origin}`);
        return;
    }

    const resource = global.caches.match(request).then((response) => {
        // Cache hit.
        if (response) {
            console.log(`[SW] fetch URL ${requestUrl.href} from cache`);
            return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = request.clone();

        // Load and cache known assets.
        return fetch(fetchRequest, { credentials: 'include' }).then((responseNetwork) => {
            if (!responseNetwork || !responseNetwork.ok) {
                console.log(`[SW] URL [${requestUrl.toString()}] wrong
                    responseNetwork: ${responseNetwork.status} ${responseNetwork.type}`);
                return responseNetwork;
            }

            console.log(`[SW] URL ${requestUrl.href} fetched`);

            const responseToCache = responseNetwork.clone();

            global.caches
                .open(CACHE_NAME)
                .then(cache => cache.put(request, responseToCache))
                .then(() => {
                    console.log(`[SW] Cache asset: ${requestUrl.href}`);
                });

            return responseNetwork;
        }).catch(() => {
            // User is landing on our page.
            if (event.request.mode === 'navigate') {
                return global.caches.match('./');
            }

            return null;
        });
    });

    event.respondWith(resource);
});

self.addEventListener('message', (event) => {
    switch (event.data.action) {
    case 'skipWaiting':
        if (self.skipWaiting) {
            self.skipWaiting();
            self.clients.claim();
        }
        break;
    default:
        break;
    }
});
