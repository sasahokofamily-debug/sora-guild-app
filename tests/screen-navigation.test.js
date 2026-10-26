const assert = require("node:assert/strict");
const { test } = require("node:test");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");

const source = readFileSync(require.resolve("../app.js"), "utf8");
const navigation = source.slice(source.indexOf("const screenScrollPositions = new Map();"), source.indexOf("function showParentAuth()"));

function createNavigation() {
  const screens = ["home", "quests", "growth", "rewards", "admin-auth", "admin"].map((id) => ({
    dataset: { screen: id }, active: id === "home",
    classList: { toggle(name, active) { screens.find((screen) => screen.dataset.screen === id).active = active; } },
  }));
  const buttons = ["home", "quests", "growth", "rewards", "admin"].map((id) => ({
    dataset: { nav: id }, attrs: {}, classList: { toggle() {} },
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
  }));
  const titles = [];
  const context = vm.createContext({
    document: {
      querySelector(selector) {
        if (selector === ".screen.is-active") return screens.find((screen) => screen.active);
        return screens.find((screen) => selector === `[data-screen="${screen.dataset.screen}"]`);
      },
      querySelectorAll(selector) { return selector === "[data-screen]" ? screens : buttons; },
    },
    window: { scrollY: 0, scrollTo({ top }) { this.scrollY = top; } },
    pendingXpAnimationStart: null,
    queueSpecialMissionEndSummaryIfNeeded() {}, markScreenVisited() {}, playSound() {},
    setText(selector, text) { titles.push(text); },
  });
  vm.runInContext(navigation, context);
  return { context, screens, buttons, titles };
}

test("tabs remember independent scroll positions and new tabs start at the top", () => {
  const { context } = createNavigation();
  context.window.scrollY = 120;
  context.switchScreen("quests");
  assert.equal(context.window.scrollY, 0);
  context.window.scrollY = 460;
  context.switchScreen("growth");
  assert.equal(context.window.scrollY, 0);
  context.switchScreen("quests");
  assert.equal(context.window.scrollY, 460);
  context.switchScreen("home");
  assert.equal(context.window.scrollY, 120);
});

test("parent authentication keeps the guild tab selected without opening admin", () => {
  const { context, screens, buttons, titles } = createNavigation();
  context.switchScreen("admin-auth");
  assert.equal(screens.find((screen) => screen.active).dataset.screen, "admin-auth");
  assert.equal(buttons.find((button) => button.attrs["aria-current"] === "page").dataset.nav, "admin");
  assert.equal(titles.at(-1), "保護者ログイン");
  context.switchScreen("home");
  assert.equal(buttons.filter((button) => button.attrs["aria-current"] === "page").length, 1);
});

test("invalid destinations leave the active screen and position unchanged", () => {
  const { context, screens, titles } = createNavigation();
  context.window.scrollY = 280;
  context.switchScreen("missing");
  assert.equal(screens.find((screen) => screen.active).dataset.screen, "home");
  assert.equal(context.window.scrollY, 280);
  assert.equal(titles.length, 0);
});
