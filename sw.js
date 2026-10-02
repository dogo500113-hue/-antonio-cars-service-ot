self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.map(k=>caches.delete(k))))
    .then(()=>self.registration.unregister())
    .then(()=>self.clients.matchAll({type:"window",includeUncontrolled:true}))
    .then(clients=>clients.forEach(c=>c.navigate(c.url)))
));