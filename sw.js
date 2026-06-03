const CACHE_NAME = "sora-quest-pwa-v23";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./assets/bg-guild.png",
  "./assets/worlds/village-bg.png",
  "./assets/worlds/mushroom-forest.png",
  "./assets/worlds/ice-cave.png",
  "./assets/quest-card.png",
  "./assets/textures/parchment-card.png",
  "./assets/icons/pwa-icon-192.png",
  "./assets/icons/pwa-icon-512.png",
  "./assets/icons/nav-home.png",
  "./assets/icons/nav-quest.png",
  "./assets/icons/nav-growth.png",
  "./assets/icons/nav-reward.png",
  "./assets/icons/nav-guild.png",
  "./assets/characters/str-stage-1.png",
  "./assets/bosses/boss-1-slime-king.png",
  "./assets/bosses/boss-2-goblin-trickster.png",
  "./assets/bosses/boss-3-mushroom-mage.png",
  "./assets/bosses/boss-4-frost-bat.png",
  "./assets/bosses/boss-5-desert-scorpion.png",
  "./assets/bosses/boss-6-forest-troll.png",
  "./assets/bosses/boss-7-baby-dragon.png",
  "./assets/bosses/boss-8-iron-golem.png",
  "./assets/bosses/boss-9-ancient-guardian.png",
  "./assets/bosses/boss-10-dark-lord.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          APP_SHELL.map((url) =>
            cache.add(url).catch((error) => {
              console.warn("PWAキャッシュに追加できませんでした", url, error);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
