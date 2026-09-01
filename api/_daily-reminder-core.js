const JAPAN_TIME_ZONE = "Asia/Tokyo";
const EVERYDAY_SCHEDULE_DAYS = [0, 1, 2, 3, 4, 5, 6];

function getJapanContext(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA-u-ca-gregory", {
    timeZone: JAPAN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const dateKey = `${values.year}-${values.month}-${values.day}`;
  const dayOfWeek = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day))).getUTCDay();
  return { dateKey, dayOfWeek };
}

function getWeekKey(dateKey) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  const japanDate = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = japanDate.getUTCDay() || 7;
  japanDate.setUTCDate(japanDate.getUTCDate() - dayOfWeek + 1);
  return [
    japanDate.getUTCFullYear(),
    String(japanDate.getUTCMonth() + 1).padStart(2, "0"),
    String(japanDate.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function normalizeScheduleDays(value) {
  const days = Array.isArray(value)
    ? [...new Set(value.map(Number))].filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    : [];
  return days.length > 0 ? days : EVERYDAY_SCHEDULE_DAYS;
}

function getCompletionKey(quest, context) {
  if (quest.frequency === "daily") {
    return `${quest.id}:daily:${context.dateKey}`;
  }
  if (quest.frequency === "weekly") {
    return `${quest.id}:weekly:${getWeekKey(context.dateKey)}`;
  }
  if (quest.frequency === "weekday") {
    return `${quest.id}:weekday:${context.dateKey}`;
  }
  return quest.id;
}

function getRemainingDailyQuestCount(reminder = {}, date = new Date()) {
  const context = getJapanContext(date);
  const completed = new Set(Array.isArray(reminder.completedQuestIds) ? reminder.completedQuestIds.map(String) : []);
  const quests = Array.isArray(reminder.quests) ? reminder.quests : [];
  return quests.filter((quest) => {
    if (!quest || !quest.id || !quest.title) {
      return false;
    }
    if (quest.availableFrom && context.dateKey < quest.availableFrom) {
      return false;
    }
    if (quest.availableUntil && context.dateKey > quest.availableUntil) {
      return false;
    }
    if (!normalizeScheduleDays(quest.scheduleDays).includes(context.dayOfWeek)) {
      return false;
    }
    return !completed.has(getCompletionKey(quest, context));
  }).length;
}

function isReminderDue(reminder = {}, lastSentDate = "", date = new Date()) {
  const { dateKey } = getJapanContext(date);
  return Boolean(reminder.enabled && lastSentDate !== dateKey && getRemainingDailyQuestCount(reminder, date) > 0);
}

module.exports = {
  getJapanContext,
  getRemainingDailyQuestCount,
  getWeekKey,
  isReminderDue,
};
