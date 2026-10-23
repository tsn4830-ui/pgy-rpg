/* 呆丸 PGY 物語：離線快取。頁面走「網路優先」，拿不到才用快取，所以更新會立刻生效。 */
const CACHE = "pgy-rpg-v78";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; const url = new URL(req.url);
  if(req.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(fetch(req).then(res => { if(res.ok && !url.pathname.endsWith(".mp4")){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
    .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
});
