importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([
  {
    "url": "build/17a06126.js",
    "revision": "001a5b473732c823a507db34291e3d8e"
  },
  {
    "url": "build/bundle.css",
    "revision": "10382bd08ad012188a8918cce1f70bdf"
  },
  {
    "url": "build/main.js",
    "revision": "6acf3d4a56b3297aa5c607519d5cd60d"
  },
  {
    "url": "index.html",
    "revision": "ba4e811b2cc3a44920b7618a36c1b76d"
  },
  {
    "url": "sw-register.js",
    "revision": "c9800323297e01047a5c0db9870cc26a"
  }
], {})

workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('index.html')
)
