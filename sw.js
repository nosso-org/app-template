importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([], {})

workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('index.html')
)
