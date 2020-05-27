importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([], {})

const handler = workbox.precaching.createHandlerBoundToURL('/index.html')
const navigationRoute = new workbox.routing.NavigationRoute(handler)
workbox.routing.registerRoute(navigationRoute)
