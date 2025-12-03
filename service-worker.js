/*
 * Service worker for Dinner Recipe Generator
 *
 * This service worker pre-caches core assets during installation and
 * serves them from cache on subsequent requests to enable offline
 * functionality. When a fetch request is made, it attempts to
 * respond from the cache first and falls back to the network if
 * necessary. New requests are cached for future use.
 */

const CACHE_NAME = 'dinner-recipe-v1';

// List of files to cache during installation. Add all assets that are
// needed for the app to run offline: HTML, CSS, JS, manifest, icons
// and recipe images.
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/service-worker.js',
  // Icon files
  '/icons/dinner-icon-192.png',
  '/icons/dinner-icon-512.png',
  // Recipe images
  '/images/carb_pasta.avif',
  '/images/carb_roasted_potatoes.avif',
  '/images/carb_quinoa.avif',
  '/images/protein_salmon.avif',
  '/images/protein_chicken.avif',
  '/images/protein_tofu.avif',
  '/images/salad_greek.avif',
  '/images/salad_kale.avif',
  '/images/salad_mixed.avif'
];

// Install event: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: try cache first, then network
self.addEventListener('fetch', event => {
  const request = event.request;
  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise fetch from network and cache it
      return fetch(request).then(networkResponse => {
        // Only cache valid responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If the network fetch fails, attempt to serve a fallback or placeholder
        // In this simple app we simply return an empty response
        return new Response('', { status: 404, statusText: 'Offline' });
      });
    })
  );
});