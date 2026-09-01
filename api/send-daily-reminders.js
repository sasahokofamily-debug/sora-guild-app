const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { FieldValue, getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");
const { getJapanContext, getRemainingDailyQuestCount, isReminderDue } = require("./_daily-reminder-core");

const INVALID_TOKEN_CODES = new Set([
  "messaging/invalid-registration-token",
  "messaging/registration-token-not-registered",
]);

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  const rawCredential = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!rawCredential) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not configured");
  }
  const serviceAccount = JSON.parse(rawCredential);
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }
  return initializeApp({ credential: cert(serviceAccount) });
}

function isAuthorized(request) {
  const secret = String(process.env.CRON_SECRET || "");
  return Boolean(secret && request.headers.authorization === `Bearer ${secret}`);
}

async function sendToDocument(messaging, document, date) {
  const data = document.data() || {};
  if (!isReminderDue(data.pushReminder, data.pushReminderLastSentDate, date)) {
    return { recipients: 0, failures: 0 };
  }
  const tokens = [...new Set((Array.isArray(data.pushTokens) ? data.pushTokens : []).map(String).filter(Boolean))].slice(0, 500);
  if (tokens.length === 0) {
    return { recipients: 0, failures: 0 };
  }

  const dateKey = getJapanContext(date).dateKey;
  const remainingCount = getRemainingDailyQuestCount(data.pushReminder, date);
  const title = `今日の任務が${remainingCount}件残っています`;
  const body = "今日のクエストを確認して、冒険を進めよう。";
  const appUrl = String(process.env.APP_URL || "https://sora-guild-app.vercel.app").replace(/\/$/, "");
  const result = await messaging.sendEachForMulticast({
    tokens,
    notification: { title, body },
    data: {
      type: "daily",
      action: "daily-quests",
      sourceId: `daily-reminder:${dateKey}`,
      title,
      body,
    },
    webpush: {
      notification: {
        icon: `${appUrl}/assets/icons/pwa-icon-192.png`,
        badge: `${appUrl}/assets/icons/pwa-icon-192.png`,
        tag: `daily-reminder:${dateKey}`,
        renotify: false,
      },
      fcmOptions: { link: `${appUrl}/?daily-quests=1` },
    },
  });

  const invalidTokens = result.responses
    .map((item, index) => ({ item, token: tokens[index] }))
    .filter(({ item }) => !item.success && INVALID_TOKEN_CODES.has(item.error?.code))
    .map(({ token }) => token);
  const update = {};
  if (result.successCount > 0) {
    update.pushReminderLastSentDate = dateKey;
    update.pushReminderLastSentAt = FieldValue.serverTimestamp();
  }
  if (invalidTokens.length > 0) {
    update.pushTokens = FieldValue.arrayRemove(...invalidTokens);
  }
  if (Object.keys(update).length > 0) {
    await document.ref.update(update);
  }
  return { recipients: result.successCount, failures: result.failureCount };
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }
  if (!isAuthorized(request)) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const adminApp = getAdminApp();
    const database = getFirestore(adminApp);
    const messaging = getMessaging(adminApp);
    const snapshot = await database.collectionGroup("guildApps").get();
    let checked = 0;
    let recipients = 0;
    let failures = 0;
    for (const document of snapshot.docs) {
      if (document.id !== "soraQuest") {
        continue;
      }
      checked += 1;
      const result = await sendToDocument(messaging, document, new Date());
      recipients += result.recipients;
      failures += result.failures;
    }
    return response.status(200).json({ checked, recipients, failures });
  } catch (error) {
    console.error("Daily reminder job failed", error);
    return response.status(500).json({ error: "Daily reminder job failed" });
  }
};
