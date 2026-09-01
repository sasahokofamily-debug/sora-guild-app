self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const notificationData = event.notification.data || {};
  const fcmData = notificationData.FCM_MSG?.data || {};
  const action = notificationData.action || fcmData.action || "notifications";
  const openDailyQuests = action === "daily-quests";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const appClient = clientList.find((client) => "focus" in client);
      if (appClient) {
        appClient.postMessage({ type: openDailyQuests ? "OPEN_DAILY_QUESTS" : "OPEN_NOTIFICATION_CENTER" });
        return appClient.focus();
      }
      return clients.openWindow(openDailyQuests ? "./?daily-quests=1" : "./?notifications=1");
    }),
  );
});

try {
  importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
  importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");
  firebase.initializeApp({
    apiKey: "AIzaSyCDw0NL1O1DPLXiVeSPuYlp37TpJaURcuM",
    authDomain: "sora-quest.firebaseapp.com",
    projectId: "sora-quest",
    storageBucket: "sora-quest.firebasestorage.app",
    messagingSenderId: "170485996766",
    appId: "1:170485996766:web:b6f6021786e0c27072764f",
  });
  firebase.messaging();
} catch (error) {
  console.warn("バックグラウンド通知を初期化できませんでした", error);
}

const CACHE_NAME = "sora-quest-pwa-v131";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260902-background-push523",
  "./app.js?v=20260902-background-push523",
  "./firebase-config-auth.js?v=20260706-version18-title-break",
  "./manifest.json",
  "./assets/bg-guild.png",
  "./assets/worlds/village-bg.png",
  "./assets/worlds/mushroom-forest.png",
  "./assets/worlds/ice-cave.png",
  "./assets/worlds/desert-ruins.png",
  "./assets/worlds/giant-forest.png",
  "./assets/worlds/dragon-mountain.png",
  "./assets/worlds/ancient-temple.png",
  "./assets/worlds/dark-castle.png",
  "./assets/worlds/sky-castle.png",
  "./assets/worlds/moonlit-forest.png",
  "./assets/worlds/thunder-cliffs.png",
  "./assets/worlds/crystal-valley.png",
  "./assets/worlds/silent-crypt.png",
  "./assets/worlds/volcanic-mountain.png",
  "./assets/quest-card.png",
  "./assets/textures/parchment-card.png",
  "./assets/icons/pwa-icon-192.png",
  "./assets/icons/pwa-icon-512.png",
  "./assets/icons/guild-emblem.png",
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
  "./assets/bosses/boss-10-dark-lord.png",
  "./assets/bosses/boss-11-shadow-wolf.png",
  "./assets/bosses/boss-12-thunderbird.png",
  "./assets/bosses/boss-13-crystal-wyvern.png",
  "./assets/bosses/boss-14-necromancer.png",
  "./assets/bosses/boss-15-flame-dragon.png",
  "./assets/audio/bgm/bgm_main.mp3",
  "./assets/audio/bgm/bgm_summer.mp3",
  "./assets/audio/sfx/sfx_tab.mp3",
  "./assets/audio/sfx/sfx_gold.mp3",
  "./assets/audio/sfx/sfx_achievement.mp3",
  "./assets/audio/sfx/sfx_level_up.mp3",
  "./assets/audio/sfx/sfx_quest_complete.mp3",
  "./assets/audio/sfx/sfx_reward_open.mp3"
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
