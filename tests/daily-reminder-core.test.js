const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getJapanContext,
  getRemainingDailyQuestCount,
  getWeekKey,
  isReminderDue,
} = require("../api/_daily-reminder-core");

const reminder = {
  enabled: true,
  quests: [
    { id: "daily", title: "歯みがき", frequency: "daily", scheduleDays: [0, 1, 2, 3, 4, 5, 6] },
    { id: "monday", title: "月曜の準備", frequency: "weekday", scheduleDays: [1] },
    { id: "once", title: "一度だけ", frequency: "once", scheduleDays: [0, 1, 2, 3, 4, 5, 6] },
  ],
  completedQuestIds: [],
};

test("日本時間の日付を使う", () => {
  assert.equal(getJapanContext(new Date("2026-09-02T15:30:00.000Z")).dateKey, "2026-09-03");
});

test("曜日指定と完了キーを反映して未完了を数える", () => {
  const date = new Date("2026-09-06T23:00:00.000Z");
  const dateKey = getJapanContext(date).dateKey;
  const count = getRemainingDailyQuestCount({
    ...reminder,
    completedQuestIds: [`daily:daily:${dateKey}`, "once"],
  }, date);
  assert.equal(count, 1);
});

test("同じ日の通知は一度だけにする", () => {
  const date = new Date("2026-09-02T09:00:00.000Z");
  assert.equal(isReminderDue(reminder, "", date), true);
  assert.equal(isReminderDue(reminder, "2026-09-02", date), false);
});

test("週キーは月曜日を基準にする", () => {
  assert.equal(getWeekKey("2026-09-06"), "2026-08-31");
  assert.equal(getWeekKey("2026-09-07"), "2026-09-07");
});
