const GAME_ID = "number-guardian";
const TOTAL_QUESTIONS = 5;
const MAX_LIVES = 3;

const questions = [
  {
    title: "غول از تو می‌خواهد عدد زیر را بخوانی. کدام گزینه درست است؟",
    number: "۲٬۳۰۴٬۰۱۵٬۰۰۰",
    options: [
      "دو میلیارد و سیصد و چهار میلیون و پانزده هزار",
      "دو میلیارد و سیصد و چهل میلیون و پانزده هزار",
      "دو میلیارد و سیصد و چهار میلیون و صد و پنجاه هزار",
      "دو میلیارد و سی میلیون و چهار هزار و پانزده",
    ],
    answer: 0,
    explanation: "۲ میلیارد + ۳۰۴ میلیون + ۱۵ هزار = ۲٬۳۰۴٬۰۱۵٬۰۰۰",
  },
  {
    title: "ارزش مکانی رقم ۸ در عدد زیر چقدر است؟",
    number: "۶٬۸۴۲٬۱۵۰٬۰۰۰",
    options: ["۸۰ میلیون", "۸۰۰ میلیون", "۸ میلیارد", "۸ هزار"],
    answer: 1,
    explanation:
      "رقم ۸ در مرتبه صدگان میلیون قرار دارد؛ پس ارزش آن ۸۰۰٬۰۰۰٬۰۰۰ است.",
  },
  {
    title: "کدام گزینه شکل گسترده عدد زیر است؟",
    number: "۴٬۰۳۰٬۰۰۷٬۰۲۰",
    options: [
      "۴٬۰۰۰٬۰۰۰٬۰۰۰ + ۳۰٬۰۰۰٬۰۰۰ + ۷٬۰۰۰ + ۲۰",
      "۴٬۰۰۰٬۰۰۰٬۰۰۰ + ۳٬۰۰۰٬۰۰۰ + ۷٬۰۰۰ + ۲۰",
      "۴۰۰٬۰۰۰٬۰۰۰ + ۳۰٬۰۰۰٬۰۰۰ + ۷٬۰۰۰ + ۲۰",
      "۴٬۰۰۰٬۰۰۰٬۰۰۰ + ۳۰٬۰۰۰٬۰۰۰ + ۷۰٬۰۰۰ + ۲۰",
    ],
    answer: 0,
    explanation: "عدد از ۴ میلیارد، ۳۰ میلیون، ۷ هزار و ۲۰ تشکیل شده است.",
  },
  {
    title: "کدام علامت برای مقایسه دو عدد زیر مناسب است؟",
    number: "۷٬۰۹۹٬۹۹۹٬۹۹۹  ؟  ۷٬۱۰۰٬۰۰۰٬۰۰۰",
    options: ["بزرگ‌تر (>)", "کوچک‌تر (<)", "مساوی (=)", "هیچ‌کدام"],
    answer: 1,
    explanation:
      "عدد سمت راست برابر ۷ میلیارد و ۱۰۰ میلیون است و از عدد سمت چپ بزرگ‌تر است.",
  },
  {
    title: "کارآگاه! الگو را کشف کن و عدد بعدی را پیدا کن.",
    number: "۳ ، ۶ ، ۱۲ ، ۲۴ ، ۴۸ ، ؟",
    options: ["۵۲", "۷۲", "۹۶", "۱۰۸"],
    answer: 2,
    explanation: "در هر مرحله عدد قبلی در ۲ ضرب شده است؛ پس ۴۸ × ۲ = ۹۶.",
  },
];

const state = {
  currentQuestion: 0,
  score: 0,
  correctCount: 0,
  lives: MAX_LIVES,
  bossHealth: 100,
  answered: false,
  finished: false,
};

const elements = {
  lives: document.getElementById("lives"),
  score: document.getElementById("score"),
  questionCounter: document.getElementById("questionCounter"),
  questionTag: document.getElementById("questionTag"),
  questionText: document.getElementById("questionText"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("nextBtn"),
  bossHealth: document.getElementById("bossHealth"),
  bossHealthText: document.getElementById("bossHealthText"),
  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  battleMessage: document.getElementById("battleMessage"),
  guardian: document.getElementById("guardian"),
  guardianFace: document.getElementById("guardianFace"),
  damageText: document.getElementById("damageText"),
  resultOverlay: document.getElementById("resultOverlay"),
  resultIcon: document.getElementById("resultIcon"),
  resultTitle: document.getElementById("resultTitle"),
  resultDescription: document.getElementById("resultDescription"),
  finalScore: document.getElementById("finalScore"),
  finalCorrect: document.getElementById("finalCorrect"),
  exitBtn: document.getElementById("exitBtn"),
  restartBtn: document.getElementById("restartBtn"),
  homeBtn: document.getElementById("homeBtn"),
};

function toPersian(value) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

function updateStats() {
  elements.lives.textContent =
    "❤️ ".repeat(state.lives) + "🖤 ".repeat(MAX_LIVES - state.lives);

  elements.score.textContent = toPersian(state.score);

  elements.questionCounter.textContent = `${toPersian(Math.min(state.currentQuestion + 1, TOTAL_QUESTIONS))} از ${toPersian(TOTAL_QUESTIONS)}`;

  const progress = (state.currentQuestion / TOTAL_QUESTIONS) * 100;

  elements.progressFill.style.width = `${progress}%`;
  elements.progressText.textContent = `${toPersian(Math.round(progress))}٪`;

  elements.bossHealth.style.width = `${state.bossHealth}%`;
  elements.bossHealthText.textContent = `${toPersian(state.bossHealth)}٪`;
}

function renderQuestion() {
  if (state.finished) return;

  const question = questions[state.currentQuestion];

  state.answered = false;

  elements.questionTag.textContent = `چالش ${toPersian(state.currentQuestion + 1)}`;

  elements.questionText.textContent = `${question.title} ${question.number}`;

  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  elements.nextBtn.disabled = true;
  elements.nextBtn.textContent =
    state.currentQuestion === TOTAL_QUESTIONS - 1
      ? "پایان نبرد ←"
      : "چالش بعدی ←";

  elements.options.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "option-btn";
    button.textContent = `${toPersian(index + 1)}. ${option}`;
    button.addEventListener("click", () => checkAnswer(index));

    elements.options.appendChild(button);
  });

  updateStats();
}

function checkAnswer(selectedIndex) {
  if (state.answered || state.finished) return;

  state.answered = true;

  const question = questions[state.currentQuestion];
  const buttons = [...elements.options.children];

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === question.answer) {
    state.score += 20;
    state.correctCount++;
    state.bossHealth = Math.max(0, state.bossHealth - 20);

    elements.feedback.textContent = `آفرین! پاسخ درست بود. ${question.explanation}`;

    elements.feedback.className = "feedback success";

    elements.battleMessage.textContent =
      "ضربه موفق! غول اعداد ضعیف‌تر شد. ادامه بده قهرمان!";

    showDamage();
    elements.guardian.classList.remove("hit");
    void elements.guardian.offsetWidth;
    elements.guardian.classList.add("hit");

    if (state.bossHealth === 0) {
      elements.guardianFace.textContent = "💫";
      elements.guardian.classList.add("defeated");
      elements.battleMessage.textContent = "شگفت‌انگیز است! سپر غول شکسته شد!";
    }
  } else {
    state.lives--;

    elements.feedback.textContent = `این بار درست نبود! ${question.explanation}`;

    elements.feedback.className = "feedback error";

    elements.battleMessage.textContent = "غول به تو ضربه زد! حواست را جمع کن.";

    elements.guardianFace.textContent = "👹";
  }

  updateStats();

  if (state.lives <= 0) {
    elements.nextBtn.disabled = false;
    elements.nextBtn.textContent = "مشاهده نتیجه";
    elements.nextBtn.onclick = finishGame;
    return;
  }

  elements.nextBtn.disabled = false;
}

function showDamage() {
  elements.damageText.textContent = "۲۰- ⚡";
  elements.damageText.classList.remove("show");

  void elements.damageText.offsetWidth;

  elements.damageText.classList.add("show");
}

function nextQuestion() {
  if (!state.answered || state.finished) return;

  if (state.lives <= 0) {
    finishGame();
    return;
  }

  if (state.currentQuestion === TOTAL_QUESTIONS - 1) {
    finishGame();
    return;
  }

  state.currentQuestion++;
  renderQuestion();
}

function finishGame() {
  if (state.finished) return;

  state.finished = true;

  const victory = state.bossHealth === 0;
  const completed =
    state.currentQuestion === TOTAL_QUESTIONS - 1 && state.lives > 0;

  elements.resultOverlay.classList.remove("hidden");

  if (victory) {
    elements.resultIcon.textContent = "🏆";
    elements.resultTitle.textContent = "قهرمان فصل اول!";
    elements.resultDescription.textContent =
      "تو تمام ضربه‌ها را درست وارد کردی و غول اعداد را شکست دادی. نشان قهرمانی متعلق به توست!";
  } else if (state.lives <= 0) {
    elements.resultIcon.textContent = "🛡️";
    elements.resultTitle.textContent = "نبرد سختی بود!";
    elements.resultDescription.textContent =
      "این بار غول اعداد پیروز شد؛ اما یک قهرمان واقعی هیچ‌وقت از تلاش دست نمی‌کشد. دوباره امتحان کن!";
  } else {
    elements.resultIcon.textContent = "⚔️";
    elements.resultTitle.textContent = "نبرد به پایان رسید!";
    elements.resultDescription.textContent =
      "تو چالش‌ها را پشت سر گذاشتی، اما غول هنوز کاملاً شکست نخورده است. با تمرین بیشتر دوباره به میدان برگرد!";
  }

  elements.finalScore.textContent = toPersian(state.score);
  elements.finalCorrect.textContent = `${toPersian(state.correctCount)} از ${toPersian(TOTAL_QUESTIONS)}`;

  elements.progressFill.style.width = `${(Math.min(state.currentQuestion + 1, TOTAL_QUESTIONS) / TOTAL_QUESTIONS) * 100}%`;

  elements.progressText.textContent = "۱۰۰٪";

  window.parent.postMessage(
    {
      type: "GAME_COMPLETED",
      gameId: GAME_ID,
      score: state.score,
      correctCount: state.correctCount,
      totalQuestions: TOTAL_QUESTIONS,
      completed,
    },
    window.location.origin,
  );
}

function exitGame() {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "GAME_EXIT",
        gameId: GAME_ID,
      },
      window.location.origin,
    );
  } else {
    window.location.href = "/";
  }
}

function restartGame() {
  state.currentQuestion = 0;
  state.score = 0;
  state.correctCount = 0;
  state.lives = MAX_LIVES;
  state.bossHealth = 100;
  state.answered = false;
  state.finished = false;

  elements.resultOverlay.classList.add("hidden");
  elements.guardian.classList.remove("defeated", "hit");
  elements.guardianFace.textContent = "👹";
  elements.nextBtn.onclick = nextQuestion;

  elements.battleMessage.textContent =
    "غول اعداد راه را بسته است! با پاسخ‌های درست به او حمله کن.";

  renderQuestion();
}

elements.nextBtn.addEventListener("click", nextQuestion);
elements.exitBtn.addEventListener("click", exitGame);
elements.homeBtn.addEventListener("click", exitGame);
elements.restartBtn.addEventListener("click", restartGame);

renderQuestion();
