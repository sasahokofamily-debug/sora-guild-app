const messages = [
  "まずは一件。依頼をこなせば、冒険者として確実に前進します。",
  "日々の達成報告が、冒険者の格を少しずつ上げていきます。",
  "迷ったら、いちばん簡単な依頼から受けて進みましょう。"
];

const messageText = document.getElementById("messageText");
const questHintText = document.getElementById("questHintText");
const homeQuestList = document.getElementById("homeQuestList");
const questBoard = document.getElementById("questBoard");
const questTotalCount = document.getElementById("questTotalCount");
const questTotalCountMirror = document.getElementById("questTotalCountMirror");
const questPendingCount = document.getElementById("questPendingCount");
const questFlashOverlay = document.getElementById("questFlashOverlay");
const parentQuestForm = document.getElementById("parentQuestForm");
const approvalList = document.getElementById("approvalList");
const activeQuestList = document.getElementById("activeQuestList");
const pendingCount = document.getElementById("pendingCount");
const activeCount = document.getElementById("activeCount");
const parentDailyCount = document.getElementById("parentDailyCount");
const parentDailyCountMirror = document.getElementById("parentDailyCountMirror");
const parentFormStatus = document.getElementById("parentFormStatus");
const templateItems = document.querySelectorAll(".template-item-button");
const completionStorageKey = "sora-parent-quests";
const activeQuestStorageKey = "sora-active-quests";
const treasureBurstStorageKey = "sora-treasure-last-burst";
const seenLevelStorageKey = "sora-last-seen-level";
const heroStatsStorageKey = "sora-hero-stats";
const heroLevelBadge = document.getElementById("heroLevelBadge");
const heroTitle = document.getElementById("heroTitle");
const heroSprite = document.getElementById("heroSprite");
const heroRelic = document.getElementById("heroRelic");
const heroMilestone = document.getElementById("heroMilestone");
const heroIconFrame = document.getElementById("heroIconFrame");
const heroSceneBackdrop = document.getElementById("heroSceneBackdrop");
const heroGearLayer = document.getElementById("heroGearLayer");
const metricStreak = document.getElementById("metricStreak");
const metricCompleted = document.getElementById("metricCompleted");
const metricChest = document.getElementById("metricChest");
const metricChestMirror = document.getElementById("metricChestMirror");
const heroStatStrength = document.getElementById("heroStatStrength");
const heroStatWisdom = document.getElementById("heroStatWisdom");
const heroStatKindness = document.getElementById("heroStatKindness");
const heroStatCleanliness = document.getElementById("heroStatCleanliness");
const heroStatStrengthBar = document.getElementById("heroStatStrengthBar");
const heroStatWisdomBar = document.getElementById("heroStatWisdomBar");
const heroStatKindnessBar = document.getElementById("heroStatKindnessBar");
const heroStatCleanlinessBar = document.getElementById("heroStatCleanlinessBar");
const homeNextStage = document.getElementById("homeNextStage");
const homePendingApprovals = document.getElementById("homePendingApprovals");
const homeNextLevelProgressText = document.getElementById("homeNextLevelProgressText");
const homeNextLevelProgressBar = document.getElementById("homeNextLevelProgressBar");
const homeGoalTitle = document.getElementById("homeGoalTitle");
const homeGoalText = document.getElementById("homeGoalText");
const homeTreasureTitle = document.getElementById("homeTreasureTitle");
const homeTreasureText = document.getElementById("homeTreasureText");
const homeTreasureProgressText = document.getElementById("homeTreasureProgressText");
const homeTreasureProgressBar = document.getElementById("homeTreasureProgressBar");
const homeTreasureCard = document.getElementById("homeTreasureCard");
const homeTreasureIconWrap = document.getElementById("homeTreasureIconWrap");
const treasureModal = document.getElementById("treasureModal");
const treasureModalBackdrop = document.getElementById("treasureModalBackdrop");
const treasureModalTitle = document.getElementById("treasureModalTitle");
const treasureModalText = document.getElementById("treasureModalText");
const treasureModalClose = document.getElementById("treasureModalClose");
const treasureModalPanel = treasureModal?.querySelector(".treasure-modal-panel");
const treasureModalIconWrap = treasureModal?.querySelector(".treasure-modal-icon-wrap");
const treasureModalIcon = document.getElementById("treasureModalIcon");
const levelUpModal = document.getElementById("levelUpModal");
const levelUpModalBackdrop = document.getElementById("levelUpModalBackdrop");
const levelUpModalTitle = document.getElementById("levelUpModalTitle");
const levelUpModalText = document.getElementById("levelUpModalText");
const levelUpModalClose = document.getElementById("levelUpModalClose");
const statusHeroLevelBadge = document.getElementById("statusHeroLevelBadge");
const statusHeroTitle = document.getElementById("statusHeroTitle");
const statusHeroSprite = document.getElementById("statusHeroSprite");
const statusHeroRelic = document.getElementById("statusHeroRelic");
const statusHeroMilestone = document.getElementById("statusHeroMilestone");
const statusHeroIconFrame = document.getElementById("statusHeroIconFrame");
const statusHeroGearLayer = document.getElementById("statusHeroGearLayer");
const currentEvolutionFrame = document.getElementById("currentEvolutionFrame");
const nextEvolutionFrame = document.getElementById("nextEvolutionFrame");
const currentEvolutionSprite = document.getElementById("currentEvolutionSprite");
const nextEvolutionSprite = document.getElementById("nextEvolutionSprite");
const currentEvolutionGearLayer = document.getElementById("currentEvolutionGearLayer");
const nextEvolutionGearLayer = document.getElementById("nextEvolutionGearLayer");
const currentEvolutionLabel = document.getElementById("currentEvolutionLabel");
const nextEvolutionLabel = document.getElementById("nextEvolutionLabel");
const visualStageText = document.getElementById("visualStageText");
const visualStageDescription = document.getElementById("visualStageDescription");
const statPower = document.getElementById("statPower");
const statWisdom = document.getElementById("statWisdom");
const statFocus = document.getElementById("statFocus");
const statKindness = document.getElementById("statKindness");
const statSpeed = document.getElementById("statSpeed");
const statChest = document.getElementById("statChest");
const statusTitleText = document.getElementById("statusTitleText");
const statusTitleTextMirror = document.getElementById("statusTitleTextMirror");
const nextLevelProgressText = document.getElementById("nextLevelProgressText");
const nextLevelProgressMirror = document.getElementById("nextLevelProgressMirror");
const nextLevelProgressBar = document.getElementById("nextLevelProgressBar");
const equipmentPrimary = document.getElementById("equipmentPrimary");
const equipmentPrimaryText = document.getElementById("equipmentPrimaryText");
const equipmentSecondary = document.getElementById("equipmentSecondary");
const equipmentSecondaryText = document.getElementById("equipmentSecondaryText");
const equipmentTertiary = document.getElementById("equipmentTertiary");
const equipmentTertiaryText = document.getElementById("equipmentTertiaryText");
const milestoneTokenPrimaryIcon = document.getElementById("milestoneTokenPrimaryIcon");
const milestoneTokenPrimaryName = document.getElementById("milestoneTokenPrimaryName");
const milestoneTokenSecondaryIcon = document.getElementById("milestoneTokenSecondaryIcon");
const milestoneTokenSecondaryName = document.getElementById("milestoneTokenSecondaryName");
const milestoneTokenTertiaryIcon = document.getElementById("milestoneTokenTertiaryIcon");
const milestoneTokenTertiaryName = document.getElementById("milestoneTokenTertiaryName");
const defaultActiveQuests = [
  {
    id: "quest-study-001",
    title: "算数ドリル 10分",
    category: "宿題",
    reward: "EXP 15",
    detail: "机に向かって10分だけ進める"
  },
  {
    id: "quest-help-001",
    title: "食器を片づける",
    category: "お手伝い",
    reward: "EXP 10",
    detail: "食後の食器を流しまで運ぶ"
  },
  {
    id: "quest-lesson-001",
    title: "ピアノ練習",
    category: "習い事",
    reward: "EXP 20",
    detail: "いつもの曲を1回通して弾く"
  }
];

let messageIndex = 0;
let lastHeroProgress = null;
const transparentSpriteProbeCache = new Map();

document.getElementById("messageCard")?.addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % messages.length;
  if (messageText) {
    messageText.textContent = messages[messageIndex];
  }
});

function createQuestId() {
  return `quest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getTransparentSpritePath(spritePath) {
  if (!spritePath || !spritePath.endsWith(".png")) {
    return spritePath;
  }
  return spritePath.replace(/\.png$/, "-transparent.png");
}

function probeImageExists(imagePath) {
  if (!imagePath) {
    return Promise.resolve(false);
  }

  if (transparentSpriteProbeCache.has(imagePath)) {
    return transparentSpriteProbeCache.get(imagePath);
  }

  const probePromise = new Promise((resolve) => {
    const probeImage = new window.Image();
    probeImage.onload = () => resolve(true);
    probeImage.onerror = () => resolve(false);
    probeImage.src = imagePath;
  });

  transparentSpriteProbeCache.set(imagePath, probePromise);
  return probePromise;
}

function setPreferredSpriteSource(spriteElement, baseSpritePath) {
  if (!spriteElement || !baseSpritePath) {
    return;
  }

  spriteElement.dataset.baseSpritePath = baseSpritePath;
  spriteElement.src = baseSpritePath;

  const transparentSpritePath = getTransparentSpritePath(baseSpritePath);
  if (!transparentSpritePath || transparentSpritePath === baseSpritePath) {
    return;
  }

  probeImageExists(transparentSpritePath).then((exists) => {
    if (spriteElement.dataset.baseSpritePath !== baseSpritePath) {
      return;
    }

    spriteElement.src = exists ? transparentSpritePath : baseSpritePath;
  });
}

function getQuestDetailFallback(category) {
  if (category === "宿題") {
    return "今日の学習を少しだけ進める";
  }
  if (category === "お手伝い") {
    return "家の役割をひとつ最後までやる";
  }
  return "決めた練習をひとつ終える";
}

function normalizeActiveQuest(quest, index = 0) {
  return {
    id: quest.id || `quest-seed-${index + 1}`,
    title: quest.title || "新規依頼",
    category: quest.category || "宿題",
    reward: quest.reward || "EXP 10",
    detail: quest.detail || getQuestDetailFallback(quest.category || "宿題")
  };
}

function normalizeCompletionRecord(record, index = 0) {
  return {
    id: record.id || `record-${index + 1}`,
    questId: record.questId || record.id || `legacy-quest-${index + 1}`,
    title: record.title || "ギルド依頼",
    category: record.category || "宿題",
    reward: record.reward || "EXP 10",
    approved: Boolean(record.approved)
  };
}

function readCompletionRecords() {
  try {
    const raw = window.localStorage.getItem(completionStorageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map(normalizeCompletionRecord);
  } catch {
    return [];
  }
}

function writeCompletionRecords(records) {
  window.localStorage.setItem(completionStorageKey, JSON.stringify(records));
}

function readActiveQuests() {
  try {
    const raw = window.localStorage.getItem(activeQuestStorageKey);
    if (!raw) {
      return defaultActiveQuests.map(normalizeActiveQuest);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultActiveQuests.map(normalizeActiveQuest);
    }
    return parsed.map(normalizeActiveQuest);
  } catch {
    return defaultActiveQuests.map(normalizeActiveQuest);
  }
}

function writeActiveQuests(quests) {
  window.localStorage.setItem(activeQuestStorageKey, JSON.stringify(quests));
}

function ensureQuestStores() {
  if (!window.localStorage.getItem(activeQuestStorageKey)) {
    writeActiveQuests(defaultActiveQuests.map(normalizeActiveQuest));
  }
  if (!window.localStorage.getItem(completionStorageKey)) {
    writeCompletionRecords(readCompletionRecords());
  }
}

function getAutoHeroScene(level) {
  if (level >= 55) {
    return "stone_hall";
  }
  if (level >= 35) {
    return "town_square";
  }
  if (level >= 15) {
    return "quest_board";
  }
  return "guild_tavern";
}

function applyHeroScene(sceneName) {
  const allowedScenes = ["guild_tavern", "stone_hall", "quest_board", "town_square"];
  const nextScene = allowedScenes.includes(sceneName) ? sceneName : "guild_tavern";

  if (heroIconFrame) {
    heroIconFrame.dataset.scene = nextScene;
  }
  if (heroSceneBackdrop) {
    heroSceneBackdrop.dataset.scene = nextScene;
  }
}

function triggerTreasureBurst(completedCount) {
  if (!homeTreasureCard) {
    return;
  }

  const lastBurstCount = Number(window.localStorage.getItem(treasureBurstStorageKey) || "0");
  if (completedCount <= 0 || completedCount === lastBurstCount) {
    return;
  }

  homeTreasureCard.classList.remove("is-bursting");
  void homeTreasureCard.offsetWidth;
  homeTreasureCard.classList.add("is-bursting");
  window.localStorage.setItem(treasureBurstStorageKey, String(completedCount));

  window.setTimeout(() => {
    homeTreasureCard.classList.remove("is-bursting");
  }, 1400);
}

function getTreasurePreviewRewards(progress) {
  const chestCount = Math.max(1, progress?.chest || 1);
  return {
    exp: 15 + (chestCount * 5),
    coin: 20 + (chestCount * 10)
  };
}

function getTreasureTier(progress) {
  const chestCount = Number(progress?.chest || 0);
  if (chestCount >= 9) {
    return { key: "legend", label: "伝説宝箱" };
  }
  if (chestCount >= 6) {
    return { key: "royal", label: "希少宝箱" };
  }
  if (chestCount >= 3) {
    return { key: "silver", label: "上質宝箱" };
  }
  return { key: "bronze", label: "木箱宝箱" };
}

function clearTreasureEffects() {
  if (!treasureModalPanel) {
    return;
  }

  treasureModalPanel.classList.remove("is-opening", "is-locked");
  treasureModalPanel.classList.remove("is-bronze", "is-silver", "is-royal", "is-legend");
  treasureModalPanel.querySelectorAll(".treasure-spark, .treasure-reward-pop, .treasure-light-flare").forEach((node) => {
    node.remove();
  });
}

function spawnTreasureFlare(tier) {
  if (!treasureModalPanel) {
    return;
  }

  const flare = document.createElement("div");
  flare.className = `treasure-light-flare is-${tier.key}`;
  treasureModalPanel.appendChild(flare);

  window.setTimeout(() => {
    flare.remove();
  }, 900);
}

function spawnTreasureParticles(tier) {
  if (!treasureModalPanel) {
    return;
  }

  const particleCount = 12;
  for (let index = 0; index < particleCount; index += 1) {
    const spark = document.createElement("span");
    spark.className = `treasure-spark is-${tier.key}`;
    spark.style.left = `${22 + Math.random() * 56}%`;
    spark.style.top = `${20 + Math.random() * 28}%`;
    spark.style.setProperty("--spark-x", `${(Math.random() - 0.5) * 96}px`);
    spark.style.setProperty("--spark-y", `${-42 - Math.random() * 86}px`);
    spark.style.setProperty("--spark-delay", `${index * 26}ms`);
    spark.style.setProperty("--spark-size", `${8 + Math.random() * 10}px`);
    treasureModalPanel.appendChild(spark);

    window.setTimeout(() => {
      spark.remove();
    }, 1500);
  }
}

function spawnTreasureRewardPops(progress, tier) {
  if (!treasureModalPanel) {
    return;
  }

  const rewards = getTreasurePreviewRewards(progress);
  const rewardEntries = [
    { label: `EXP +${rewards.exp}`, tone: "exp", left: "34%" },
    { label: `金貨 +${rewards.coin}`, tone: "coin", left: "66%" },
    { label: tier.label, tone: "tier", left: "50%" }
  ];

  rewardEntries.forEach((reward, index) => {
    const pop = document.createElement("div");
    pop.className = `treasure-reward-pop is-${reward.tone} is-${tier.key}`;
    pop.textContent = reward.label;
    pop.style.left = reward.left;
    pop.style.animationDelay = `${180 + (index * 140)}ms`;
    if (reward.tone === "tier") {
      pop.style.top = "90px";
    }
    treasureModalPanel.appendChild(pop);

    window.setTimeout(() => {
      pop.remove();
    }, 1900);
  });
}

function playTreasureOpenEffect(progress) {
  if (!treasureModalPanel) {
    return;
  }

  clearTreasureEffects();

  const isReady = Boolean(progress?.treasureReady);
  const tier = getTreasureTier(progress);
  treasureModalPanel.classList.add(`is-${tier.key}`);
  treasureModalPanel.classList.add(isReady ? "is-opening" : "is-locked");

  if (!isReady) {
    window.setTimeout(() => {
      treasureModalPanel.classList.remove("is-locked");
    }, 620);
    return;
  }

  spawnTreasureFlare(tier);
  window.setTimeout(() => {
    spawnTreasureParticles(tier);
    spawnTreasureRewardPops(progress, tier);
  }, 120);

  window.setTimeout(() => {
    treasureModalPanel?.classList.remove("is-opening");
  }, 1500);
}

function openTreasureModal() {
  if (!treasureModal || !lastHeroProgress) {
    return;
  }

  const rewardText = lastHeroProgress.treasureReady
    ? `宝箱 ${lastHeroProgress.chest} 個目の開封準備が整っています。次は階級と報酬演出をさらに強化できます。`
    : `あと ${Math.max(1, 3 - (lastHeroProgress.completedCount % 3 || 0))} 回ギルド受理されると、次の宝箱が開きます。`;
  const tier = getTreasureTier(lastHeroProgress);

  if (treasureModalTitle) {
    treasureModalTitle.textContent = lastHeroProgress.treasureReady ? `${tier.label} 開封準備完了` : `${tier.label} 準備中`;
  }
  if (treasureModalText) {
    treasureModalText.textContent = rewardText;
  }
  treasureModal.hidden = false;
  document.body.classList.add("modal-open");
  playTreasureOpenEffect(lastHeroProgress);
}

function closeTreasureModal() {
  if (!treasureModal) {
    return;
  }
  clearTreasureEffects();
  treasureModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openLevelUpModal(progress) {
  if (!levelUpModal || !progress) {
    return;
  }

  if (levelUpModalTitle) {
    levelUpModalTitle.textContent = `Lv ${progress.level} 到達`;
  }
  if (levelUpModalText) {
    levelUpModalText.textContent = `${progress.currentStage.title} に昇格しました。新しい姿と装備が解放されています。`;
  }
  levelUpModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeLevelUpModal() {
  if (!levelUpModal) {
    return;
  }
  levelUpModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function triggerQuestCompleteEffect(card) {
  if (card) {
    card.classList.remove("is-flashing");
    void card.offsetWidth;
    card.classList.add("is-flashing");
    window.setTimeout(() => {
      card.classList.remove("is-flashing");
    }, 900);
  }

  if (questFlashOverlay) {
    questFlashOverlay.classList.remove("is-active");
    void questFlashOverlay.offsetWidth;
    questFlashOverlay.classList.add("is-active");
    window.setTimeout(() => {
      questFlashOverlay.classList.remove("is-active");
    }, 650);
  }
}

function parseRewardExp(reward) {
  const matched = String(reward).match(/(\d+)/);
  return matched ? Number(matched[1]) : 10;
}

function matchesLifeQuest(record) {
  const source = `${record.title || ""} ${record.detail || ""}`;
  return /身支度|着替|せんたく|洗濯|洗顔|歯みが|歯磨|おふろ|風呂|手洗|片づ|片付|整え|食器|そうじ|掃除/.test(source);
}

function matchesPhysicalHelp(record) {
  const source = `${record.title || ""} ${record.detail || ""}`;
  return /運ぶ|片づ|片付|掃除|そうじ|洗|料理|たたむ|しまう|並べる|買い物/.test(source);
}

function buildHeroStats(records) {
  const stats = {
    strength: 1,
    wisdom: 1,
    kindness: 1,
    cleanliness: 1
  };

  records.forEach((record) => {
    if (record.category === "宿題") {
      stats.wisdom += 2;
    }

    if (record.category === "習い事") {
      stats.wisdom += 1;
    }

    if (record.category === "お手伝い") {
      stats.kindness += 1;
      if (matchesPhysicalHelp(record)) {
        stats.strength += 1;
      } else {
        stats.kindness += 1;
      }
    }

    if (matchesLifeQuest(record)) {
      stats.cleanliness += 2;
    }
  });

  return stats;
}

function writeHeroStats(stats) {
  window.localStorage.setItem(heroStatsStorageKey, JSON.stringify(stats));
}

function getQuestAttribute(category) {
  if (category === "お手伝い") {
    return { label: "支援", className: "quest-attr-help" };
  }
  if (category === "習い事") {
    return { label: "技術", className: "quest-attr-lesson" };
  }
  return { label: "知性", className: "quest-attr-study" };
}

function getQuestRarity(reward) {
  const exp = parseRewardExp(reward);
  if (exp >= 20) {
    return { label: "UR", className: "quest-rarity-ur" };
  }
  if (exp >= 15) {
    return { label: "SR", className: "quest-rarity-sr" };
  }
  return { label: "R", className: "quest-rarity-r" };
}

function getQuestGlyph(category) {
  if (category === "お手伝い") {
    return { label: "家", className: "quest-glyph-help" };
  }
  if (category === "習い事") {
    return { label: "習", className: "quest-glyph-lesson" };
  }
  return { label: "学", className: "quest-glyph-study" };
}

function hasPendingRecord(questId) {
  return readCompletionRecords().some((record) => record.questId === questId && !record.approved);
}

function bindQuestPreviewButtons() {
  document.querySelectorAll("[data-quest-title]").forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-quest-title");
      if (title && messageText) {
        messageText.textContent = `「${title}」を受注して進めましょう。`;
      }
      if (title && questHintText) {
        questHintText.textContent = `「${title}」を終えたら、ギルドへ完了報告できます。`;
      }
    });
  });
}

function renderHomeQuests() {
  if (!homeQuestList) {
    return;
  }

  const quests = readActiveQuests().slice(0, 3);
  if (quests.length === 0) {
    homeQuestList.innerHTML = '<div class="empty-note">ギルド画面から依頼を発行できます</div>';
    return;
  }

  homeQuestList.innerHTML = quests.map((quest) => {
    const glyph = getQuestGlyph(quest.category);
    const attribute = getQuestAttribute(quest.category);
    return `
      <button class="quest-item quest-item-home-command" type="button" data-quest-title="${quest.title}">
        <span class="quest-glyph ${glyph.className}">
          <span>${glyph.label}</span>
        </span>
        <span class="quest-attribute ${attribute.className}">${attribute.label}</span>
        <span class="quest-category">${quest.category}</span>
        <strong>${quest.title}</strong>
      </button>
    `;
  }).join("");

  bindQuestPreviewButtons();
}

function renderQuestBoard() {
  if (!questBoard) {
    return;
  }

  const quests = readActiveQuests();
  if (questTotalCount) {
    questTotalCount.textContent = `${quests.length}件`;
  }
  if (questTotalCountMirror) {
    questTotalCountMirror.textContent = `${quests.length}件`;
  }

  if (quests.length === 0) {
    questBoard.innerHTML = '<div class="empty-note">ギルド画面から依頼を発行してください</div>';
    return;
  }

  questBoard.innerHTML = quests.map((quest) => {
    const glyph = getQuestGlyph(quest.category);
    const attribute = getQuestAttribute(quest.category);
    const rarity = getQuestRarity(quest.reward);
    const isPending = hasPendingRecord(quest.id);
    return `
      <article class="quest-item quest-item-large quest-item-record quest-item-command" data-quest-id="${quest.id}" data-quest-title="${quest.title}" data-quest-category="${quest.category}" data-quest-reward="${quest.reward}">
        <div class="quest-command-main">
          <span class="quest-glyph ${glyph.className} quest-glyph-large">
            <span>${glyph.label}</span>
          </span>
          <div class="quest-command-copy">
            <div class="quest-command-tags">
              <span class="quest-rarity ${rarity.className}">${rarity.label}</span>
              <span class="quest-attribute ${attribute.className}">${attribute.label}</span>
            </div>
            <span class="quest-category">${quest.category}</span>
            <strong>${quest.title}</strong>
            <p>${quest.detail}</p>
          </div>
        </div>
        <div class="quest-command-footer">
          <div class="quest-reward-badge">${quest.reward}</div>
          <button class="secondary-button complete-button complete-button-command ${isPending ? "is-complete" : ""}" type="button" ${isPending ? "disabled" : ""}>
            ${isPending ? "報告済み" : "完了を報告"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  bindQuestPreviewButtons();
  bindCompleteButtons();
}

const earlyStageNames = [
  null,
  "布靴見習い",
  "木剣見習い",
  "旅支度見習い",
  "朝駆け見習い",
  "銅帯見習い",
  "小盾見習い",
  "野原の従士",
  "街道の従士",
  "旅立ちの従士",
  "旅立ちの騎士",
  "革鎧の騎士",
  "青章の騎士",
  "早駆け騎士",
  "守り手騎士",
  "星灯の騎士",
  "鉄紋の騎士",
  "白槍の騎士",
  "蒼光の騎士",
  "青銅騎士",
  "青銅騎士"
];

const middleStageNames = [
  null,
  "青銅副騎士",
  "青銅前衛",
  "青銅守備騎士",
  "青銅機動騎士",
  "青銅戦列騎士",
  "鉄帯騎士",
  "鉄章騎士",
  "鉄壁騎士",
  "鉄槍騎士",
  "鉄紋騎士",
  "白刃騎士",
  "白盾騎士",
  "白鋼騎士",
  "白光騎士",
  "白銀副騎士",
  "白銀前衛",
  "白銀守護騎士",
  "白銀機動騎士",
  "白銀騎士",
  "白銀騎士"
];

const advancedStageNames = [
  null,
  "白銀魔導騎士",
  "白銀術騎士",
  "白銀星術騎士",
  "白銀輝術騎士",
  "魔導副騎士",
  "魔導前衛",
  "魔導護衛騎士",
  "魔導星騎士",
  "魔導騎士",
  "魔導騎士",
  "聖護副騎士",
  "聖護前衛",
  "聖護守備騎士",
  "聖護慈光騎士",
  "聖護紋騎士",
  "聖護星騎士",
  "聖護白騎士",
  "聖護機動騎士",
  "聖護騎士",
  "聖護騎士"
];

const finalStageNames = [
  null,
  "王国副騎士",
  "王国前衛",
  "王国守備騎士",
  "王国機動騎士",
  "王国旗騎士",
  "王国星騎士",
  "王国護衛長",
  "王国騎士",
  "王国騎士",
  "星冠副冒険者",
  "星冠前衛",
  "星冠守護冒険者",
  "星冠機動冒険者",
  "星冠輝刃冒険者",
  "星冠白翼冒険者",
  "星冠蒼光冒険者",
  "星冠天光冒険者",
  "星冠冒険者",
  "星冠冒険者",
  "神話冒険者"
];

function getEarlyStageName(level) {
  return earlyStageNames[Math.max(1, Math.min(20, level))];
}

function getMiddleStageName(level) {
  return middleStageNames[Math.max(1, Math.min(20, level - 20))];
}

function getAdvancedStageName(level) {
  return advancedStageNames[Math.max(1, Math.min(20, level - 40))];
}

function getFinalStageName(level) {
  return finalStageNames[Math.max(1, Math.min(20, level - 60))];
}

function getMilestoneSprite(level) {
  if (level >= 80) {
    return "./icons/hero-lv80.png";
  }
  if (level >= 70) {
    return "./icons/hero-lv70.png";
  }
  if (level >= 60) {
    return "./icons/hero-lv60.png";
  }
  if (level >= 50) {
    return "./icons/hero-lv50.png";
  }
  if (level >= 40) {
    return "./icons/hero-lv40.png";
  }
  if (level >= 30) {
    return "./icons/hero-lv30.png";
  }
  if (level >= 20) {
    return "./icons/hero-lv20.png";
  }
  if (level >= 10) {
    return "./icons/hero-lv10.png";
  }
  return "./icons/hero-lv10.png";
}

function getHeroStage(level) {
  if (level >= 80) {
    return {
      title: getFinalStageName(level),
      label: getFinalStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "神話の聖印",
      equipmentText: "全段階を踏破した最終装備"
    };
  }
  if (level >= 70) {
    return {
      title: getFinalStageName(level),
      label: getFinalStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "星冠の紋章",
      equipmentText: "高位段階に入り、輝きが最大級になっている"
    };
  }
  if (level >= 60) {
    return {
      title: getFinalStageName(level),
      label: getFinalStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "王国の紋章",
      equipmentText: "高位依頼を安定して達成中"
    };
  }
  if (level >= 50) {
    return {
      title: getAdvancedStageName(level),
      label: getAdvancedStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "聖護の腕輪",
      equipmentText: "やさしさと安定感が大きく育っている"
    };
  }
  if (level >= 40) {
    return {
      title: getAdvancedStageName(level),
      label: getAdvancedStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "魔導の宝珠",
      equipmentText: "知恵と集中が高まり、装いも変化している"
    };
  }
  if (level >= 30) {
    return {
      title: getMiddleStageName(level),
      label: getMiddleStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "白銀の印",
      equipmentText: "造形の密度が増し、姿に威厳が出ている"
    };
  }
  if (level >= 20) {
    return {
      title: getMiddleStageName(level),
      label: getMiddleStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "青銅の徽章",
      equipmentText: "序盤を超えて、見た目にも厚みが出てきた"
    };
  }
  if (level >= 10) {
    return {
      title: getEarlyStageName(level),
      label: getEarlyStageName(level),
      sprite: getMilestoneSprite(level),
      equipment: "旅立ちの印",
      equipmentText: "基礎が固まり、冒険者らしい姿になってきた"
    };
  }
  return {
    title: getEarlyStageName(10),
    label: getEarlyStageName(10),
    sprite: "./icons/hero-lv10.png",
    equipment: "旅立ちの印",
    equipmentText: "最初の段階から旅立ちの騎士の造形で統一"
  };
}

function getNextHeroStage(level) {
  const nextMilestoneLevel = level < 10 ? 20 : Math.min(80, Math.ceil((level + 1) / 10) * 10);
  return getHeroStage(nextMilestoneLevel);
}

function getVisualStageDescription(level) {
  if (level <= 5) {
    return "見習いの姿です。";
  }
  if (level <= 10) {
    return "少しずつ騎士らしくなります。";
  }
  if (level <= 15) {
    return "鎧と光が増えていきます。";
  }
  if (level <= 20) {
    return "青銅騎士が近づいています。";
  }
  if (level <= 25) {
    return "姿に厚みが出てきます。";
  }
  if (level <= 30) {
    return "防具の存在感が増します。";
  }
  if (level <= 35) {
    return "鋭さが見えてきます。";
  }
  if (level <= 40) {
    return "白銀段階に入ります。";
  }
  if (level <= 45) {
    return "光り方が変わります。";
  }
  if (level <= 50) {
    return "姿がさらに洗練されます。";
  }
  if (level <= 55) {
    return "守りの印象が強まります。";
  }
  if (level <= 60) {
    return "高位の姿が整っていきます。";
  }
  if (level <= 65) {
    return "上位の風格が出てきます。";
  }
  if (level <= 70) {
    return "王国級の姿になります。";
  }
  if (level <= 75) {
    return "特別な輝きが現れます。";
  }
  if (level <= 79) {
    return "最終段階が近づいています。";
  }
  if (level >= 80) {
    return "完成した姿です。";
  }
  if (level >= 60) {
    return "高位段階です。";
  }
  if (level >= 40) {
    return "中盤後半です。";
  }
  if (level >= 20) {
    return "中盤です。";
  }
  return "序盤です。";
}

function getVisualTuning(level) {
  const stageRate = (Math.max(1, Math.min(80, level)) - 1) / 79;
  return {
    scale: 1.02 + stageRate * 0.26,
    brightness: 0.98 + stageRate * 0.3,
    saturate: 1 + stageRate * 0.9,
    hue: Math.round(stageRate * 38),
    frameGlow: 10 + Math.round(stageRate * 26),
    frameAlpha: 0.16 + stageRate * 0.22,
    borderAlpha: 0.22 + stageRate * 0.28
  };
}

function getAdornmentTheme(level) {
  if (level >= 70) {
    return { tone: "mythic", accent: "星冠", aura: "rgba(255, 223, 139, 0.56)" };
  }
  if (level >= 50) {
    return { tone: "royal", accent: "聖護", aura: "rgba(163, 214, 255, 0.54)" };
  }
  if (level >= 30) {
    return { tone: "silver", accent: "白銀", aura: "rgba(196, 212, 255, 0.5)" };
  }
  if (level >= 20) {
    return { tone: "bronze", accent: "青銅", aura: "rgba(229, 184, 90, 0.48)" };
  }
  return { tone: "novice", accent: "旅立ち", aura: "rgba(133, 209, 159, 0.42)" };
}

function getAdornmentPieces(level) {
  const stageStep = ((Math.max(1, level) - 1) % 10) + 1;
  const pieces = [];

  if (stageStep >= 2) {
    pieces.push("boots");
  }
  if (stageStep >= 3) {
    pieces.push("belt");
  }
  if (stageStep >= 4) {
    pieces.push("left-shoulder");
  }
  if (stageStep >= 5) {
    pieces.push("right-shoulder");
  }
  if (stageStep >= 6) {
    pieces.push("mantle");
  }
  if (stageStep >= 7) {
    pieces.push("weapon");
  }
  if (stageStep >= 8) {
    pieces.push("crest");
  }
  if (stageStep >= 9) {
    pieces.push("crown");
  }
  if (stageStep >= 10) {
    pieces.push("aura");
  }

  return pieces;
}

function getAdornmentSummary(level) {
  const theme = getAdornmentTheme(level);
  const pieces = getAdornmentPieces(level);
  const labels = {
    boots: "脚甲",
    belt: "腰章",
    "left-shoulder": "左肩当て",
    "right-shoulder": "右肩当て",
    mantle: "外套",
    weapon: "武器光",
    crest: "胸紋",
    crown: "冠光",
    aura: "後光"
  };

  if (pieces.length === 0) {
    return `${theme.accent}段階の素地が整い始めています`;
  }

  const visibleLabels = pieces.slice(-3).map((piece) => labels[piece]);
  return `${theme.accent}段階の細部進化: ${visibleLabels.join("・")}`;
}

function renderGearLayer(layerElement, level) {
  if (!layerElement) {
    return;
  }

  const theme = getAdornmentTheme(level);
  const pieces = getAdornmentPieces(level);
  layerElement.dataset.tone = theme.tone;
  layerElement.style.setProperty("--gear-aura", theme.aura);
  layerElement.innerHTML = pieces
    .map((piece) => `<span class="gear-piece gear-${piece}" aria-hidden="true"></span>`)
    .join("");
}

function getMilestoneVisuals(level) {
  if (level >= 80) {
    return {
      badge: "神話完成",
      relic: "./icons/enemy.png",
      primaryToken: { icon: "./icons/enemy.png", name: "神話の核" },
      secondaryToken: { icon: "./icons/chest.png", name: "終極宝匣" },
      tertiaryToken: { icon: "./icons/sword.png", name: "冒険者終剣" }
    };
  }
  if (level >= 70) {
    return {
      badge: "星冠到達",
      relic: "./icons/chest.png",
      primaryToken: { icon: "./icons/chest.png", name: "星冠宝匣" },
      secondaryToken: { icon: "./icons/sword.png", name: "白翼の剣" },
      tertiaryToken: { icon: "./icons/enemy.png", name: "天光の証" }
    };
  }
  if (level >= 60) {
    return {
      badge: "王国昇格",
      relic: "./icons/sword.png",
      primaryToken: { icon: "./icons/sword.png", name: "王国剣章" },
      secondaryToken: { icon: "./icons/chest.png", name: "護衛宝匣" },
      tertiaryToken: { icon: "./icons/enemy.png", name: "高位試練" }
    };
  }
  if (level >= 50) {
    return {
      badge: "聖護覚醒",
      relic: "./icons/chest.png",
      primaryToken: { icon: "./icons/chest.png", name: "聖護の箱" },
      secondaryToken: { icon: "./icons/sword.png", name: "慈光短剣" },
      tertiaryToken: { icon: "./icons/enemy.png", name: "守護試練" }
    };
  }
  if (level >= 40) {
    return {
      badge: "魔導転位",
      relic: "./icons/enemy.png",
      primaryToken: { icon: "./icons/enemy.png", name: "魔導印核" },
      secondaryToken: { icon: "./icons/sword.png", name: "術騎の刃" },
      tertiaryToken: { icon: "./icons/chest.png", name: "星術宝匣" }
    };
  }
  if (level >= 30) {
    return {
      badge: "白銀昇格",
      relic: "./icons/sword.png",
      primaryToken: { icon: "./icons/sword.png", name: "白銀の剣" },
      secondaryToken: { icon: "./icons/chest.png", name: "白盾の箱" },
      tertiaryToken: { icon: "./icons/enemy.png", name: "白刃試練" }
    };
  }
  if (level >= 20) {
    return {
      badge: "青銅昇格",
      relic: "./icons/sword.png",
      primaryToken: { icon: "./icons/sword.png", name: "青銅の剣" },
      secondaryToken: { icon: "./icons/chest.png", name: "守備の箱" },
      tertiaryToken: { icon: "./icons/enemy.png", name: "前衛試練" }
    };
  }
  if (level >= 10) {
    return {
      badge: "旅立ち完了",
      relic: "./icons/chest.png",
      primaryToken: { icon: "./icons/chest.png", name: "旅装の箱" },
      secondaryToken: { icon: "./icons/sword.png", name: "革剣の印" },
      tertiaryToken: { icon: "./icons/enemy.png", name: "従士試練" }
    };
  }
  return {
    badge: "初期段階",
    relic: "./icons/sword.png",
    primaryToken: { icon: "./icons/sword.png", name: "木剣の印" },
    secondaryToken: { icon: "./icons/chest.png", name: "旅装の箱" },
    tertiaryToken: { icon: "./icons/enemy.png", name: "試練の印" }
  };
}

function applyStageVisual(spriteElement, frameElement, level, emphasis = 1) {
  if (!spriteElement && !frameElement) {
    return;
  }

  const tuning = getVisualTuning(level);
  const spriteFilter = `brightness(${(tuning.brightness + emphasis * 0.02).toFixed(2)}) saturate(${(tuning.saturate + emphasis * 0.04).toFixed(2)}) hue-rotate(${tuning.hue}deg)`;
  const spriteBoost = spriteElement?.id === "heroSprite"
    ? 0.24
    : spriteElement?.id === "statusHeroSprite"
      ? 0.18
      : spriteElement?.id === "currentEvolutionSprite" || spriteElement?.id === "nextEvolutionSprite"
        ? 0.1
        : 0;
  const spriteScale = (tuning.scale + emphasis * 0.02 + spriteBoost).toFixed(2);

  if (spriteElement) {
    spriteElement.style.filter = spriteFilter;
    spriteElement.style.setProperty("--hero-sprite-scale", spriteScale);
  }

  if (frameElement) {
    frameElement.style.borderColor = `rgba(229, 184, 90, ${Math.min(0.7, tuning.borderAlpha)})`;
    frameElement.style.boxShadow = `0 0 0 3px rgba(109, 169, 255, ${tuning.frameAlpha}), 0 10px ${tuning.frameGlow}px rgba(229, 184, 90, ${Math.min(0.35, tuning.frameAlpha)})`;
    frameElement.style.background = `linear-gradient(180deg, rgba(255, 248, 222, ${0.8 + tuning.frameAlpha * 0.2}), rgba(255, 255, 255, 0.97))`;
  }
}

function buildHeroProgress() {
  const approvedQuests = readCompletionRecords().filter((quest) => quest.approved);
  const heroStats = buildHeroStats(approvedQuests);
  const totalExp = approvedQuests.reduce((sum, quest) => sum + parseRewardExp(quest.reward), 0);
  const level = Math.max(1, Math.min(80, Math.floor(totalExp / 10) + 1));
  const completedCount = approvedQuests.length;
  const streak = Math.max(1, Math.min(7, completedCount));
  const chest = Math.floor(completedCount / 3);
  const wisdom = heroStats.wisdom;
  const kindness = heroStats.kindness;
  const focus = 1 + approvedQuests.filter((quest) => quest.category === "習い事").length * 2;
  const power = heroStats.strength;
  const speed = 1 + Math.floor(totalExp / 15);
  const nextLevelExp = level >= 80 ? totalExp : level * 10;
  const currentLevelBaseExp = (level - 1) * 10;
  const progressValue = level >= 80
    ? 100
    : Math.min(100, Math.round(((totalExp - currentLevelBaseExp) / (nextLevelExp - currentLevelBaseExp || 10)) * 100));
  const treasureCycle = completedCount % 3;
  const treasureReady = treasureCycle === 0 && completedCount > 0;
  const treasureProgressValue = treasureReady ? 100 : Math.round((treasureCycle / 3) * 100);
  const treasureProgressText = treasureReady ? "開封可能" : `${treasureCycle} / 3`;

  return {
    level,
    totalExp,
    completedCount,
    streak,
    chest,
    power,
    wisdom,
    focus,
    kindness,
    cleanliness: heroStats.cleanliness,
    speed,
    progressValue,
    treasureReady,
    treasureProgressValue,
    treasureProgressText,
    visualStageText: `第${level}段階 / 80`,
    visualStageDescription: getVisualStageDescription(level),
    nextVisualStageText: level >= 80 ? "完成" : `次は ${getNextHeroStage(level).label}`,
    nextLevelLabel: level >= 80 ? "完成" : getNextHeroStage(level).label,
    currentStage: getHeroStage(level),
    nextStage: getNextHeroStage(level)
  };
}

function syncHeroViews() {
  const progress = buildHeroProgress();
  lastHeroProgress = progress;
  applyHeroScene(getAutoHeroScene(progress.level));
  writeHeroStats({
    strength: progress.power,
    wisdom: progress.wisdom,
    kindness: progress.kindness,
    cleanliness: progress.cleanliness
  });
  const seenLevel = Number(window.localStorage.getItem(seenLevelStorageKey) || "0");
  if (seenLevel === 0) {
    window.localStorage.setItem(seenLevelStorageKey, String(progress.level));
  } else if (progress.level > seenLevel) {
    window.localStorage.setItem(seenLevelStorageKey, String(progress.level));
    openLevelUpModal(progress);
  }
  const milestone = getMilestoneVisuals(progress.level);

  if (heroLevelBadge) {
    heroLevelBadge.textContent = `Lv ${progress.level}`;
  }
  if (heroTitle) {
    heroTitle.textContent = progress.currentStage.title;
  }
  if (heroSprite) {
    setPreferredSpriteSource(heroSprite, progress.currentStage.sprite);
  }
  if (heroRelic) {
    heroRelic.src = milestone.relic;
  }
  if (heroMilestone) {
    heroMilestone.textContent = milestone.badge;
  }
  applyStageVisual(heroSprite, heroIconFrame, progress.level, 1);
  renderGearLayer(heroGearLayer, progress.level);
  if (metricStreak) {
    metricStreak.textContent = `${progress.streak}日`;
  }
  if (metricCompleted) {
    metricCompleted.textContent = `${progress.completedCount}回`;
  }
  if (metricChest) {
    metricChest.textContent = `${progress.chest}個`;
  }
  if (metricChestMirror) {
    metricChestMirror.textContent = `${progress.chest}個`;
  }
  if (heroStatStrength) {
    heroStatStrength.textContent = String(progress.power);
  }
  if (heroStatWisdom) {
    heroStatWisdom.textContent = String(progress.wisdom);
  }
  if (heroStatKindness) {
    heroStatKindness.textContent = String(progress.kindness);
  }
  if (heroStatCleanliness) {
    heroStatCleanliness.textContent = String(progress.cleanliness);
  }
  if (heroStatStrengthBar) {
    heroStatStrengthBar.style.width = `${Math.min(100, progress.power * 8)}%`;
  }
  if (heroStatWisdomBar) {
    heroStatWisdomBar.style.width = `${Math.min(100, progress.wisdom * 8)}%`;
  }
  if (heroStatKindnessBar) {
    heroStatKindnessBar.style.width = `${Math.min(100, progress.kindness * 8)}%`;
  }
  if (heroStatCleanlinessBar) {
    heroStatCleanlinessBar.style.width = `${Math.min(100, progress.cleanliness * 8)}%`;
  }
  if (homeNextStage) {
    homeNextStage.textContent = progress.nextLevelLabel;
  }
  if (homePendingApprovals) {
    const pendingRecords = readCompletionRecords().filter((record) => !record.approved);
    homePendingApprovals.textContent = `${pendingRecords.length}件`;
  }
  if (homeNextLevelProgressText) {
    homeNextLevelProgressText.textContent = `${progress.progressValue}%`;
  }
  if (homeNextLevelProgressBar) {
    homeNextLevelProgressBar.style.width = `${progress.progressValue}%`;
  }
  if (homeGoalTitle) {
    homeGoalTitle.textContent = progress.level >= 80 ? "最終段階に到達済み" : `次は ${progress.nextLevelLabel}`;
  }
  if (homeGoalText) {
    homeGoalText.textContent = progress.level >= 80
      ? "ここからは依頼を重ねて、報告と階級をさらに積み上げていけます。"
      : `${progress.nextLevelLabel} まであと ${Math.max(0, 100 - progress.progressValue)}% です。今日の依頼をひとつ進めましょう。`;
  }
  if (homeTreasureTitle) {
    homeTreasureTitle.textContent = progress.treasureReady
      ? "宝箱が開けられます"
      : progress.chest > 0
        ? `宝箱 ${progress.chest} 個を獲得中`
        : "宝箱はまだ閉じています";
  }
  if (homeTreasureText) {
    homeTreasureText.textContent = progress.treasureReady
      ? "ギルド受理が3回たまりました。宝箱を開いて次の報酬を受け取れます。"
      : `ギルド受理をあと ${Math.max(1, 3 - (progress.completedCount % 3 || 0))} 回重ねると、次の宝箱が開きます。`;
  }
  if (homeTreasureProgressText) {
    homeTreasureProgressText.textContent = progress.treasureProgressText;
  }
  if (homeTreasureProgressBar) {
    homeTreasureProgressBar.style.width = `${progress.treasureProgressValue}%`;
  }
  if (homeTreasureCard) {
    homeTreasureCard.classList.toggle("is-ready", progress.treasureReady);
  }
  if (homeTreasureIconWrap) {
    homeTreasureIconWrap.classList.toggle("is-ready", progress.treasureReady);
  }
  if (progress.treasureReady) {
    triggerTreasureBurst(progress.completedCount);
  }

  if (statusHeroLevelBadge) {
    statusHeroLevelBadge.textContent = `Lv ${progress.level}`;
  }
  if (statusHeroTitle) {
    statusHeroTitle.textContent = progress.currentStage.title;
  }
  if (statusHeroSprite) {
    setPreferredSpriteSource(statusHeroSprite, progress.currentStage.sprite);
  }
  if (statusHeroRelic) {
    statusHeroRelic.src = milestone.relic;
  }
  if (statusHeroMilestone) {
    statusHeroMilestone.textContent = milestone.badge;
  }
  applyStageVisual(statusHeroSprite, statusHeroIconFrame, progress.level, 1.2);
  renderGearLayer(statusHeroGearLayer, progress.level);
  if (currentEvolutionSprite) {
    setPreferredSpriteSource(currentEvolutionSprite, progress.currentStage.sprite);
  }
  applyStageVisual(currentEvolutionSprite, currentEvolutionFrame, progress.level, 0.8);
  renderGearLayer(currentEvolutionGearLayer, progress.level);
  if (nextEvolutionSprite) {
    setPreferredSpriteSource(nextEvolutionSprite, progress.nextStage.sprite);
  }
  applyStageVisual(nextEvolutionSprite, nextEvolutionFrame, Math.min(80, progress.level + 1), 0.4);
  renderGearLayer(nextEvolutionGearLayer, Math.min(80, progress.level + 1));
  if (currentEvolutionLabel) {
    currentEvolutionLabel.textContent = progress.currentStage.label;
  }
  if (nextEvolutionLabel) {
    nextEvolutionLabel.textContent = progress.nextStage.label;
  }
  if (visualStageText) {
    visualStageText.textContent = `${progress.visualStageText}  ${progress.nextVisualStageText}`;
  }
  if (visualStageDescription) {
    visualStageDescription.textContent = progress.visualStageDescription;
  }
  if (statPower) {
    statPower.textContent = String(progress.power);
  }
  if (statWisdom) {
    statWisdom.textContent = String(progress.wisdom);
  }
  if (statFocus) {
    statFocus.textContent = String(progress.focus);
  }
  if (statKindness) {
    statKindness.textContent = String(progress.kindness);
  }
  if (statSpeed) {
    statSpeed.textContent = String(progress.speed);
  }
  if (statChest) {
    statChest.textContent = String(progress.chest);
  }
  if (statusTitleText) {
    statusTitleText.textContent = progress.currentStage.title;
  }
  if (statusTitleTextMirror) {
    statusTitleTextMirror.textContent = progress.currentStage.title;
  }
  if (nextLevelProgressText) {
    nextLevelProgressText.textContent = `${progress.progressValue}%`;
  }
  if (nextLevelProgressMirror) {
    nextLevelProgressMirror.textContent = `${progress.progressValue}%`;
  }
  if (nextLevelProgressBar) {
    nextLevelProgressBar.style.width = `${progress.progressValue}%`;
  }
  if (equipmentPrimary) {
    equipmentPrimary.textContent = progress.currentStage.equipment;
  }
  if (equipmentPrimaryText) {
    equipmentPrimaryText.textContent = progress.currentStage.equipmentText;
  }
  if (equipmentSecondary) {
    equipmentSecondary.textContent = "継続の勲章";
  }
  if (equipmentSecondaryText) {
    equipmentSecondaryText.textContent = `ギルド受理 ${progress.completedCount} 回で輝きが増す`;
  }
  if (equipmentTertiary) {
    equipmentTertiary.textContent = "細部進化";
  }
  if (equipmentTertiaryText) {
    equipmentTertiaryText.textContent = getAdornmentSummary(progress.level);
  }
  if (milestoneTokenPrimaryIcon) {
    milestoneTokenPrimaryIcon.src = milestone.primaryToken.icon;
  }
  if (milestoneTokenPrimaryName) {
    milestoneTokenPrimaryName.textContent = milestone.primaryToken.name;
  }
  if (milestoneTokenSecondaryIcon) {
    milestoneTokenSecondaryIcon.src = milestone.secondaryToken.icon;
  }
  if (milestoneTokenSecondaryName) {
    milestoneTokenSecondaryName.textContent = milestone.secondaryToken.name;
  }
  if (milestoneTokenTertiaryIcon) {
    milestoneTokenTertiaryIcon.src = milestone.tertiaryToken.icon;
  }
  if (milestoneTokenTertiaryName) {
    milestoneTokenTertiaryName.textContent = milestone.tertiaryToken.name;
  }
}

function syncQuestPendingCount() {
  if (!questPendingCount) {
    return;
  }
  const records = readCompletionRecords();
  questPendingCount.textContent = `${records.filter((quest) => !quest.approved).length}件`;
}

function updateParentCounts(records) {
  const activeQuestCount = readActiveQuests().length;
  if (pendingCount) {
    pendingCount.textContent = `${records.filter((quest) => !quest.approved).length}件`;
  }
  if (activeCount) {
    activeCount.textContent = `${activeQuestCount}件`;
  }
  if (parentDailyCount) {
    parentDailyCount.textContent = `${activeQuestCount}件`;
  }
  if (parentDailyCountMirror) {
    parentDailyCountMirror.textContent = `${activeQuestCount}件`;
  }
}

function bindApproveButtons() {
  document.querySelectorAll(".approve-button").forEach((button) => {
    button.addEventListener("click", () => {
      const recordId = button.getAttribute("data-record-id");
      const records = readCompletionRecords().map((record) => (
        record.id === recordId ? { ...record, approved: true } : record
      ));
      writeCompletionRecords(records);
      renderParentQuests();
      renderQuestBoard();
    });
  });
}

function renderParentQuests() {
  if (!approvalList) {
    syncQuestPendingCount();
    syncHeroViews();
    return;
  }

  const records = readCompletionRecords();
  updateParentCounts(records);
  syncQuestPendingCount();
  syncHeroViews();
  renderActiveQuestList();

  const pendingRecords = records.filter((quest) => !quest.approved);

  if (pendingRecords.length === 0) {
    approvalList.innerHTML = '<div class="empty-note">受理待ちの報告はありません</div>';
    return;
  }

  approvalList.innerHTML = pendingRecords
    .map((quest) => `
      <article class="approval-item">
        <div>
          <span class="quest-category">${quest.category}</span>
          <strong>${quest.title}</strong>
          <p>${quest.reward}</p>
        </div>
        <button class="approve-button" type="button" data-record-id="${quest.id}">受理</button>
      </article>
    `)
    .join("");

  bindApproveButtons();
}

function bindQuestManageButtons() {
  document.querySelectorAll(".manage-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const questId = button.getAttribute("data-quest-id");
      const activeQuests = readActiveQuests().filter((quest) => quest.id !== questId);
      writeActiveQuests(activeQuests);
      renderParentQuests();
      renderHomeQuests();
      renderQuestBoard();
    });
  });
}

function renderActiveQuestList() {
  if (!activeQuestList) {
    return;
  }

  const activeQuests = readActiveQuests();
  if (activeQuests.length === 0) {
    activeQuestList.innerHTML = '<div class="empty-note">発行中の依頼はありません</div>';
    return;
  }

  activeQuestList.innerHTML = activeQuests.map((quest) => `
    <article class="approval-item manage-item">
      <div>
        <span class="quest-category">${quest.category}</span>
        <strong>${quest.title}</strong>
        <p>${quest.detail} / ${quest.reward}</p>
      </div>
      <button class="secondary-button manage-delete-button" type="button" data-quest-id="${quest.id}">削除</button>
    </article>
  `).join("");

  bindQuestManageButtons();
}

ensureQuestStores();
renderHomeQuests();
renderQuestBoard();

if (approvalList) {
  renderParentQuests();
} else {
  syncQuestPendingCount();
  syncHeroViews();
}

parentQuestForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("parentQuestTitle");
  const categoryInput = document.getElementById("parentQuestCategory");
  const rewardInput = document.getElementById("parentQuestReward");
  const detailInput = document.getElementById("parentQuestDetail");

  const title = titleInput?.value.trim();
  const category = categoryInput?.value || "宿題";
  const reward = rewardInput?.value || "EXP 10";
  const detail = detailInput?.value.trim() || getQuestDetailFallback(category);

  if (!title) {
    return;
  }

  const quests = readActiveQuests();
  quests.unshift({
    id: createQuestId(),
    title,
    category,
    reward,
    detail
  });
  writeActiveQuests(quests);
  renderParentQuests();
  renderHomeQuests();
  renderQuestBoard();
  parentQuestForm.reset();
  if (parentFormStatus) {
    parentFormStatus.textContent = `「${title}」を発行しました。冒険者画面に反映されています。`;
  }
});

templateItems.forEach((item) => {
  item.addEventListener("click", () => {
    const titleInput = document.getElementById("parentQuestTitle");
    const categoryInput = document.getElementById("parentQuestCategory");
    const rewardInput = document.getElementById("parentQuestReward");
    const detailInput = document.getElementById("parentQuestDetail");

    if (titleInput) {
      titleInput.value = item.getAttribute("data-template-title") || "";
      titleInput.focus();
    }
    if (categoryInput) {
      categoryInput.value = item.getAttribute("data-template-category") || "宿題";
    }
    if (rewardInput) {
      rewardInput.value = item.getAttribute("data-template-reward") || "EXP 10";
    }
    if (detailInput) {
      const category = item.getAttribute("data-template-category") || "宿題";
      detailInput.value = getQuestDetailFallback(category);
    }
  });
});

function bindCompleteButtons() {
  document.querySelectorAll(".complete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".quest-item-record");
      const questId = card?.getAttribute("data-quest-id");
      const title = card?.getAttribute("data-quest-title");
      const category = card?.getAttribute("data-quest-category") || "宿題";
      const reward = card?.getAttribute("data-quest-reward") || "EXP 10";

      if (!title || !questId) {
        return;
      }

      const records = readCompletionRecords();
      const alreadyPending = records.some((record) => record.questId === questId && !record.approved);

      if (!alreadyPending) {
        records.unshift({
          id: `record-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          questId,
          title,
          category,
          reward,
          approved: false
        });
        writeCompletionRecords(records);
      }

      button.textContent = "報告済み";
      button.classList.add("is-complete");
      button.setAttribute("disabled", "true");
      triggerQuestCompleteEffect(card);
      syncQuestPendingCount();

      if (questHintText) {
        questHintText.textContent = `「${title}」を報告しました。ギルド画面で受理できます。`;
      }
    });
  });
}

syncHeroViews();

homeTreasureCard?.addEventListener("click", openTreasureModal);
treasureModalBackdrop?.addEventListener("click", closeTreasureModal);
treasureModalClose?.addEventListener("click", closeTreasureModal);
levelUpModalBackdrop?.addEventListener("click", closeLevelUpModal);
levelUpModalClose?.addEventListener("click", closeLevelUpModal);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
