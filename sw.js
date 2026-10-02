const C="acs-ot-v41";
const A=["./","./index.html","./manifest.webmanifest","./icon.svg","./sw.js","./logo.svg?v=39"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(u.pathname.endsWith("/index.html")||u.pathname.endsWith("/")){
  e.respondWith(fetch(e.request,{cache:"no-store"}).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match(e.request)));
  return;
 }
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(e.request,copy));return res})));
});