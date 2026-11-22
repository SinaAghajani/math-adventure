const TOTAL_LEVELS = 5;
const TOTAL_LIVES = 3;
const MAX_DIGITS = 9;

const placeNames = [
  "صدگان میلیون",
  "دهگان میلیون",
  "یکان میلیون",
  "صدگان هزار",
  "دهگان هزار",
  "یکان هزار",
  "صدگان",
  "دهگان",
  "یکان",
];

const elements = {
  levelNumber: document.getElementById("levelNumber"),
  score: document.getElementById("score"),
  correctCount: document.getElementById("correctCount"),
  lives: document.getElementById("lives"),
  progressText: document.getElementById("progressText"),
  progressFill: document.getElementById("progressFill"),
  expandedNumber: document.getElementById("expandedNumber"),
  placeValueGrid: document.getElementById("placeValueGrid"),
  digitTiles: document.getElementById("digitTiles"),
  resetButton: document.getElementById("resetButton"),
  checkButton: document.getElementById("checkButton"),
  feedback: document.getElementById("feedback"),
  resultModal: document.getElementById("resultModal"),
  resultEmoji: document.getElementById("resultEmoji"),
  resultTitle: document.getElementById("resultTitle"),
  resultDescription: document.getElementById("resultDescription"),
  finalScore: document.getElementById("finalScore"),
  restartButton: document.getElementById("restartButton"),
  exitButton: document.getElementById("exitButton"),
  backButton: document.getElementById("backButton"),
};

const state = {
  level: 1,
  score: 0,
  correctCount: 0,
  lives: TOTAL_LIVES,
  currentMission: null,
  selectedTileId: null,
  answers: Array(MAX_DIGITS).fill(null),
  mistakes: 0,
  finished: false,
};

const toPersian = (value) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const formatNumber = (value) => toPersian(value.toLocaleString("en-US"));

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function createMission() {
  const digits = Array.from({ length: MAX_DIGITS }, () => randomDigit());

  // عدد باید نه‌رقمی باشد.
  digits[0] = Math.floor(Math.random() * 9) + 1;

  const number = Number(digits.join(""));

  const terms = digits
    .map((digit, index) => {
      if (digit === 0) return null;

      const placeValue = 10 ** (MAX_DIGITS - index - 1);
      return {
        digit,
        value: digit * placeValue,
        index,
      };
    })
    .filter(Boolean);

  return {
    digits,
    number,
    terms,
  };
}

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function renderExpandedNumber() {
  const terms = shuffle(state.currentMission.terms);

  elements.expandedNumber.textContent = terms
    .map((term) => formatNumber(term.value))
    .join(" + ");
}

function renderPlaceValueGrid() {
  elements.placeValueGrid.innerHTML = "";

  placeNames.forEach((name, index) => {
    const column = document.createElement("div");
    column.className = "place-column";

    const label = document.createElement("div");
    label.className = "place-name";
    label.textContent = name;

    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "place-slot";
    slot.dataset.index = index;
    slot.setAttribute("aria-label", `جایگاه ${name}`);

    const answer = state.answers[index];

    slot.textContent =
      answer === null || answer === undefined ? "؟" : toPersian(answer.digit);

    if (answer !== null && answer !== undefined) {
      slot.classList.add("filled");
    }

    if (state.selectedTileId !== null) {
      slot.classList.add("selected");
    }

    slot.addEventListener("click", () => handleSlotClick(index));

    column.append(label, slot);
    elements.placeValueGrid.appendChild(column);
  });
}

function getAvailableTiles() {
  const usedTileIds = state.answers
    .filter((answer) => answer !== null)
    .map((answer) => answer.id);

  return state.currentMission.shuffledTiles.map((tile) => ({
    ...tile,
    used: usedTileIds.includes(tile.id),
  }));
}

function renderDigitTiles() {
  elements.digitTiles.innerHTML = "";

  getAvailableTiles().forEach((tile) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "digit-tile";
    button.textContent = toPersian(tile.digit);
    button.disabled = tile.used;

    if (tile.id === state.selectedTileId) {
      button.classList.add("selected");
    }

    button.setAttribute("aria-label", `رقم ${toPersian(tile.digit)}`);

    button.addEventListener("click", () => {
      if (tile.used || state.finished) return;

      state.selectedTileId = state.selectedTileId === tile.id ? null : tile.id;

      renderDigitTiles();
      renderPlaceValueGrid();
    });

    elements.digitTiles.appendChild(button);
  });
}

function renderStatus() {
  elements.levelNumber.textContent = toPersian(state.level);
  elements.score.textContent = formatNumber(state.score);
  elements.correctCount.textContent = toPersian(state.correctCount);
  elements.lives.textContent = toPersian(state.lives);

  const progress = Math.round(((state.level - 1) / TOTAL_LEVELS) * 100);

  elements.progressText.textContent = `${toPersian(progress)}٪`;
  elements.progressFill.style.width = `${progress}%`;
}

function setFeedback(message, type = "") {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${type}`;
}

function getSelectedTile() {
  return state.currentMission.shuffledTiles.find(
    (tile) => tile.id === state.selectedTileId,
  );
}

function handleSlotClick(index) {
  if (state.finished) return;

  // اگر خانه پر باشد، با کلیک دوباره آن را خالی می‌کنیم.
  if (state.answers[index] !== null) {
    state.answers[index] = null;
    state.selectedTileId = null;

    renderDigitTiles();
    renderPlaceValueGrid();

    setFeedback("رقم از جایگاه خارج شد. می‌توانی دوباره آن را انتخاب کنی.");
    return;
  }

  if (state.selectedTileId === null) {
    setFeedback("ابتدا یکی از رقم‌ها را انتخاب کن.");
    return;
  }

  const selectedTile = getSelectedTile();

  if (!selectedTile) return;

  // رقم اول عدد نمی‌تواند صفر باشد.
  if (index === 0 && selectedTile.digit === 0) {
    setFeedback("عدد نه‌رقمی نمی‌تواند با صفر شروع شود!", "error");
    return;
  }

  state.answers[index] = {
    id: selectedTile.id,
    digit: selectedTile.digit,
  };

  state.selectedTileId = null;

  renderDigitTiles();
  renderPlaceValueGrid();

  setFeedback("خوب پیش می‌روی! بقیه رقم‌ها را هم قرار بده.");
}

function resetAnswers() {
  if (state.finished) return;

  state.answers = Array(MAX_DIGITS).fill(null);
  state.selectedTileId = null;

  renderDigitTiles();
  renderPlaceValueGrid();

  setFeedback("همه رقم‌ها پاک شدند. دوباره تلاش کن!");
}

function checkAnswer() {
  if (state.finished) return;

  const isComplete = state.answers.every((answer) => answer !== null);

  if (!isComplete) {
    setFeedback("هنوز همه خانه‌ها پر نشده‌اند!", "error");
    return;
  }

  const playerNumber = state.answers.map((answer) => answer.digit).join("");

  const correctNumber = state.currentMission.number;

  const isCorrect = Number(playerNumber) === correctNumber;

  if (isCorrect) {
    state.score += Math.max(10, 20 - state.mistakes * 5);
    state.correctCount++;

    setFeedback("آفرین! عدد را کاملاً درست ساختی. ⭐", "success");

    renderStatus();

    // برای جلوگیری از چندبار ثبت پاسخ
    state.finished = true;
    elements.checkButton.disabled = true;

    elements.checkButton.textContent = "درست بود! ✓";

    setTimeout(() => {
      nextLevel();
    }, 1300);

    return;
  }

  state.lives--;
  state.mistakes++;

  renderStatus();

  elements.placeValueGrid
    .querySelectorAll(".place-slot")
    .forEach((slot, index) => {
      slot.classList.toggle(
        "wrong",
        state.answers[index].digit !== state.currentMission.digits[index],
      );
    });

  if (state.lives <= 0) {
    setFeedback(
      `فرصت‌هایت تمام شد! عدد درست ${formatNumber(correctNumber)} بود.`,
      "error",
    );

    setTimeout(() => {
      endGame();
    }, 1400);

    return;
  }

  setFeedback(
    "یک یا چند رقم در جایگاه اشتباه قرار گرفته‌اند. دوباره بررسی کن!",
    "error",
  );
}

function startLevel() {
  state.finished = false;
  state.mistakes = 0;
  state.answers = Array(MAX_DIGITS).fill(null);
  state.selectedTileId = null;

  const mission = createMission();

  const shuffledTiles = shuffle(
    mission.digits.map((digit, index) => ({
      id: index,
      digit,
    })),
  );

  state.currentMission = {
    ...mission,
    shuffledTiles,
  };

  elements.checkButton.disabled = false;
  elements.checkButton.innerHTML = "بررسی عدد <span>✓</span>";

  renderExpandedNumber();
  renderPlaceValueGrid();
  renderDigitTiles();
  renderStatus();

  setFeedback("رقم‌ها را در جایگاه مناسب قرار بده!");
}

function nextLevel() {
  if (state.level >= TOTAL_LEVELS) {
    endGame();
    return;
  }

  state.level++;
  startLevel();
}

function sendResultToParent() {
  if (window.parent === window) return;

  const result = {
    type: "GAME_COMPLETED",
    gameId: "number-factory",
    score: state.score,
    correctCount: state.correctCount,
    totalQuestions: TOTAL_LEVELS,
    completed: state.correctCount === TOTAL_LEVELS,
  };

  window.parent.postMessage(result, window.location.origin);
}

function endGame() {
  state.finished = true;

  const completedAll = state.correctCount === TOTAL_LEVELS;

  elements.progressText.textContent = "۱۰۰٪";
  elements.progressFill.style.width = "100%";

  elements.resultEmoji.textContent = completedAll ? "🏆" : "🌟";
  elements.resultTitle.textContent = completedAll
    ? "قهرمان کارخانه اعداد شدی!"
    : "ماجراجویی به پایان رسید!";

  elements.resultDescription.textContent = completedAll
    ? "همه مأموریت‌ها را با موفقیت پشت سر گذاشتی. عالی بود!"
    : `تو ${toPersian(state.correctCount)} مأموریت را با موفقیت انجام دادی. دوباره تلاش کن تا قهرمان شوی!`;

  elements.finalScore.textContent = formatNumber(state.score);
  elements.resultModal.classList.remove("hidden");

  sendResultToParent();
}

function restartGame() {
  state.level = 1;
  state.score = 0;
  state.correctCount = 0;
  state.lives = TOTAL_LIVES;
  state.finished = false;

  elements.resultModal.classList.add("hidden");

  startLevel();
}

function goBack() {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "GAME_EXIT",
        gameId: "number-factory",
      },
      window.location.origin,
    );

    return;
  }

  window.location.href = "/";
}

elements.resetButton.addEventListener("click", resetAnswers);
elements.checkButton.addEventListener("click", checkAnswer);
elements.restartButton.addEventListener("click", restartGame);
elements.exitButton.addEventListener("click", goBack);
elements.backButton.addEventListener("click", (event) => {
  if (window.parent !== window) {
    event.preventDefault();
    goBack();
  }
});

startLevel();
