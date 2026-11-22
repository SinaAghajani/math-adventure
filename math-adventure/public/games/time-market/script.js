const GAME_ID = "time-market";
const TOTAL_QUESTIONS = 5;
const POINTS_PER_ANSWER = 20;

const questions = [
  {
    customer: "مشتری اول: فروشنده ساعت",
    icon: "⏰",
    title: "یک ساعت چند دقیقه است؟",
    description: "برای تحویل سفارش اول، واحد زمان را تبدیل کن.",
    options: ["۳۰ دقیقه", "۶۰ دقیقه", "۹۰ دقیقه", "۱۲۰ دقیقه"],
    answer: 1,
    explanation: "هر ساعت برابر با ۶۰ دقیقه است.",
  },
  {
    customer: "مشتری دوم: دونده مسابقه",
    icon: "🏃",
    title: "۲ ساعت و ۳۵ دقیقه چند دقیقه است؟",
    description: "زمان تمرین دونده را به دقیقه تبدیل کن.",
    options: ["۱۲۵ دقیقه", "۱۴۵ دقیقه", "۱۵۵ دقیقه", "۱۶۵ دقیقه"],
    answer: 2,
    explanation:
      "۲ ساعت برابر با ۱۲۰ دقیقه است. با افزودن ۳۵ دقیقه، ۱۵۵ دقیقه به دست می‌آید.",
  },
  {
    customer: "مشتری سوم: ساعت‌ساز",
    icon: "⌚",
    title: "۳ ساعت و ۱۵ دقیقه چند ثانیه است؟",
    description: "برای تعمیر ساعت، زمان را به ثانیه تبدیل کن.",
    options: ["۱۰٬۵۰۰ ثانیه", "۱۱٬۷۰۰ ثانیه", "۱۲٬۰۰۰ ثانیه", "۱۳٬۵۰۰ ثانیه"],
    answer: 1,
    explanation:
      "۳ ساعت و ۱۵ دقیقه برابر با ۱۹۵ دقیقه است. ۱۹۵ × ۶۰ = ۱۱٬۷۰۰ ثانیه.",
  },
  {
    customer: "مشتری چهارم: مسافر قطار",
    icon: "🚆",
    title:
      "قطار ساعت ۸:۴۵ حرکت کرد. اگر سفر ۲ ساعت و ۳۵ دقیقه طول بکشد، چه ساعتی می‌رسد؟",
    description: "زمان رسیدن قطار را پیدا کن.",
    options: ["۱۰:۵۰", "۱۱:۱۰", "۱۱:۲۰", "۱۱:۳۰"],
    answer: 2,
    explanation:
      "۸:۴۵ به‌علاوه ۲ ساعت می‌شود ۱۰:۴۵؛ با افزودن ۳۵ دقیقه، ساعت ۱۱:۲۰ خواهد بود.",
  },
  {
    customer: "مشتری پنجم: مدیر سینما",
    icon: "🎬",
    title:
      "فیلمی ساعت ۱۴:۲۰ شروع و ساعت ۱۶:۰۵ تمام شده است. مدت فیلم چقدر بوده؟",
    description: "مدت‌زمان نمایش فیلم را محاسبه کن.",
    options: [
      "۱ ساعت و ۲۵ دقیقه",
      "۱ ساعت و ۳۵ دقیقه",
      "۱ ساعت و ۴۵ دقیقه",
      "۲ ساعت و ۱۵ دقیقه",
    ],
    answer: 2,
    explanation:
      "از ۱۴:۲۰ تا ۱۵:۲۰ یک ساعت و از ۱۵:۲۰ تا ۱۶:۰۵ چهل‌وپنج دقیقه است؛ در مجموع یک ساعت و ۴۵ دقیقه.",
  },
];

const state = {
  currentQuestion: 0,
  score: 0,
  correctCount: 0,
  lives: 3,
  answered: false,
  finished: false,
};

const elements = {
  score: document.getElementById("score"),
  mission: document.getElementById("mission"),
  lives: document.getElementById("lives"),
  progress: document.getElementById("progress"),
  missionTag: document.getElementById("missionTag"),
  questionIcon: document.getElementById("questionIcon"),
  customer: document.getElementById("customer"),
  question: document.getElementById("question"),
  description: document.getElementById("description"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("nextBtn"),
  resultScreen: document.getElementById("resultScreen"),
  resultIcon: document.getElementById("resultIcon"),
  resultTitle: document.getElementById("resultTitle"),
  resultMessage: document.getElementById("resultMessage"),
  finalScore: document.getElementById("finalScore"),
  resultDetails: document.getElementById("resultDetails"),
  restartBtn: document.getElementById("restartBtn"),
  finishBtn: document.getElementById("finishBtn"),
  exitBtn: document.getElementById("exitBtn"),
};

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

function toPersian(value) {
  return String(value).replace(/\d/g, (digit) => persianDigits[digit]);
}

function updateStats() {
  elements.score.textContent = toPersian(state.score);

  elements.mission.textContent = `${toPersian(Math.min(state.currentQuestion + 1, TOTAL_QUESTIONS))} از ${toPersian(TOTAL_QUESTIONS)}`;

  elements.lives.textContent =
    "❤️".repeat(state.lives) + "🖤".repeat(3 - state.lives);

  elements.progress.style.width = `${(state.currentQuestion / TOTAL_QUESTIONS) * 100}%`;
}

function renderQuestion() {
  if (state.finished) return;

  const question = questions[state.currentQuestion];

  state.answered = false;

  elements.missionTag.textContent = `سفارش ${toPersian(state.currentQuestion + 1)}`;

  elements.questionIcon.textContent = question.icon;
  elements.customer.textContent = question.customer;
  elements.question.textContent = question.title;
  elements.description.textContent = question.description;

  elements.options.innerHTML = "";
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  elements.nextBtn.disabled = true;
  elements.nextBtn.textContent =
    state.currentQuestion === TOTAL_QUESTIONS - 1
      ? "مشاهده نتیجه نهایی 🏆"
      : "سفارش بعدی ←";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index, button);
    });

    elements.options.appendChild(button);
  });

  updateStats();
}

function checkAnswer(selectedIndex, selectedButton) {
  if (state.answered || state.finished) return;

  state.answered = true;

  const question = questions[state.currentQuestion];
  const optionButtons = elements.options.querySelectorAll(".option");

  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  if (selectedIndex === question.answer) {
    state.score += POINTS_PER_ANSWER;
    state.correctCount++;

    selectedButton.classList.add("correct");

    elements.feedback.textContent = `✅ آفرین! ${question.explanation}`;

    elements.feedback.className = "feedback success";
  } else {
    state.lives--;

    selectedButton.classList.add("wrong");
    optionButtons[question.answer].classList.add("correct");

    elements.feedback.textContent = `❌ پاسخ درست: ${question.options[question.answer]} | ${question.explanation}`;

    elements.feedback.className = "feedback error";
  }

  updateStats();

  if (state.lives <= 0) {
    elements.nextBtn.disabled = true;

    setTimeout(() => {
      finishGame();
    }, 1800);

    return;
  }

  elements.nextBtn.disabled = false;
}

function nextQuestion() {
  if (!state.answered || state.finished) return;

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

  const completed = state.correctCount === TOTAL_QUESTIONS;
  const percentage = Math.round((state.correctCount / TOTAL_QUESTIONS) * 100);

  elements.progress.style.width = `${(Math.min(state.currentQuestion + 1, TOTAL_QUESTIONS) / TOTAL_QUESTIONS) * 100}%`;

  elements.resultScreen.classList.remove("hidden");

  if (completed) {
    elements.resultIcon.textContent = "🏆";
    elements.resultTitle.textContent = "سلطان زمان!";
    elements.resultMessage.textContent =
      "تبریک! تمام سفارش‌های بازار زمان را با موفقیت انجام دادی.";
  } else if (state.correctCount >= 3) {
    elements.resultIcon.textContent = "🥈";
    elements.resultTitle.textContent = "ماجراجوی پرتلاش!";
    elements.resultMessage.textContent =
      "عملکرد خوبی داشتی! با کمی تمرین می‌توانی تمام سفارش‌ها را درست انجام بدهی.";
  } else {
    elements.resultIcon.textContent = "💪";
    elements.resultTitle.textContent = "تلاش خوبی بود!";
    elements.resultMessage.textContent =
      "دوباره تمرین کن تا در تبدیل واحدهای زمان ماهر شوی.";
  }

  elements.finalScore.textContent = toPersian(state.score);

  elements.resultDetails.innerHTML = `
    پاسخ‌های درست: ${toPersian(state.correctCount)} از ${toPersian(TOTAL_QUESTIONS)}<br>
    درصد پاسخ‌های درست: ${toPersian(percentage)}٪<br>
    فرصت‌های باقی‌مانده: ${toPersian(state.lives)}
  `;

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

function restartGame() {
  state.currentQuestion = 0;
  state.score = 0;
  state.correctCount = 0;
  state.lives = 3;
  state.answered = false;
  state.finished = false;

  elements.resultScreen.classList.add("hidden");

  renderQuestion();
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

elements.nextBtn.addEventListener("click", nextQuestion);
elements.restartBtn.addEventListener("click", restartGame);
elements.finishBtn.addEventListener("click", exitGame);

elements.exitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  exitGame();
});

renderQuestion();
