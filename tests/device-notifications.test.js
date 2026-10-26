const assert = require("node:assert/strict");
const { test } = require("node:test");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");

const source = readFileSync(require.resolve("../app.js"), "utf8");
function loadFunction(name, context) {
  const start = source.search(new RegExp(`(?:async )?function ${name}\\(`));
  assert.notEqual(start, -1);
  const tail = source.slice(start);
  const next = tail.slice(1).search(/\n(?:async )?function /);
  vm.runInContext(next < 0 ? tail : tail.slice(0, next + 1), context);
}

function setup(overrides = {}) {
  const messages = [];
  const context = vm.createContext({
    window: { Notification: {} },
    Notification: { permission: "granted" },
    deviceNotificationRequestPending: false,
    getDeviceNotificationStatus: () => ({ key: "granted" }),
    initializeFirebaseMessagingForUser: async () => true,
    showDeviceNotification: async () => true,
    showToast: (message) => messages.push(message),
    renderNotificationCenter() {},
    console: { warn() {} },
    ...overrides,
  });
  loadFunction("requestDeviceNotificationPermission", context);
  return { context, messages };
}

test("local notification failure never claims success", async () => {
  const { context, messages } = setup({ showDeviceNotification: async () => false });
  await context.requestDeviceNotificationPermission();
  assert.match(messages[0], /表示できませんでした/);
  assert.equal(context.deviceNotificationRequestPending, false);
});

test("registration failure preserves local testing but reports incomplete setup", async () => {
  const { context, messages } = setup({ initializeFirebaseMessagingForUser: async () => { throw new Error("offline"); } });
  await context.requestDeviceNotificationPermission();
  assert.match(messages[0], /準備状況を確認/);
  assert.doesNotMatch(messages[0], /登録も完了/);
});

test("repeated taps send one test and unlock the button on completion", async () => {
  let release;
  let sent = 0;
  const ready = new Promise((resolve) => { release = resolve; });
  const { context } = setup({
    initializeFirebaseMessagingForUser: () => ready,
    showDeviceNotification: async () => { sent++; return true; },
  });
  const first = context.requestDeviceNotificationPermission();
  await context.requestDeviceNotificationPermission();
  release(true);
  await first;
  assert.equal(sent, 1);
  assert.equal(context.deviceNotificationRequestPending, false);
});

test("test notification works with reminder settings off while normal notices stay off", async () => {
  let sent = 0;
  const context = vm.createContext({
    notificationSettings: {},
    normalizeNotificationSettings: () => ({ approvalDeviceEnabled: false, dailyReminderEnabled: false }),
    window: { Notification: {} }, Notification: { permission: "granted" },
    navigator: { serviceWorker: { ready: Promise.resolve({ showNotification: async () => { sent++; } }) } },
    console,
  });
  loadFunction("showDeviceNotification", context);
  assert.equal(await context.showDeviceNotification("test", "test", { kind: "test" }), true);
  assert.equal(await context.showDeviceNotification("daily", "daily", { kind: "daily" }), false);
  assert.equal(await context.showDeviceNotification("approval", "approval"), false);
  assert.equal(sent, 1);
});

test("permission errors allow another attempt", async () => {
  const { context, messages } = setup({ Notification: { permission: "default", requestPermission: async () => { throw new Error("denied"); } } });
  await context.requestDeviceNotificationPermission();
  assert.match(messages[0], /もう一度/);
  assert.equal(context.deviceNotificationRequestPending, false);
});
