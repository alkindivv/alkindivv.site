// Implement service worker for caching static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/offline.html',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.png'
      ])
    })
  )
})