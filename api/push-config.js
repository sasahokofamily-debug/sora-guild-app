module.exports = function handler(_request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.status(200).json({
    vapidKey: String(process.env.FIREBASE_WEB_PUSH_VAPID_KEY || ""),
  });
};
