const GAME_ID = "pattern-detective";
const TOTAL_QUESTIONS = 5;
const POINTS_PER_ANSWER = 20;

const questions = [
  {
    icon: "🔢",
    title: "پرونده اول: سرنخ ساده",
    description: "قانون الگو را پیدا کن و عدد بعدی را مشخص کن.",
    caseLabel: "الگوی افزایشی",
    sequence: ["۵", "۱۰", "۱۵", "۲۰", "?"],
    options: ["۲۲", "۲۵", "۳۰", "۳۵"],
    answer: 1,
    explanation: "هر بار ۵ واحد به عدد قبلی اضافه شده است؛ پس عدد بعدی ۲۵ است.",
  },
  {
    icon: "⚡",
    title: "پرونده دوم: رمز دوبرابر",
    description: "به رابطه بین عددها دقت کن.",
    caseLabel: "الگوی ضربی",
    sequence: ["۷", "۱۴", "۲۸", "۵۶", "?"],
    options: ["۶۳", "۸۴", "۹۸", "۱۱۲"],
    answer: 3,
    explanation:
      "هر عدد دو برابر عدد قبلی است؛ بنابراین ۵۶ × ۲ برابر با ۱۱۲ می‌شود.",
  },
  {
    icon: "🧊",
    title: "پرونده سوم: ردپای کاهشی",
    description: "این بار الگو به سمت عددهای کوچک‌تر حرکت می‌کند.",
    caseLabel: "الگوی کاهشی",
    sequence: ["۹۶۰", "۸۴۰", "۷۲۰", "۶۰۰", "?"],
    options: ["۴۸۰", "۵۰۰", "۵۲۰", "۵۴۰"],
    answer: 0,
    explanation:
      "در هر مرحله ۱۲۰ واحد کم می‌شود؛ پس ۶۰۰ منهای ۱۲۰ برابر با ۴۸۰ است.",
  },
  {
    icon: "🌀",
    title: "پرونده چهارم: الگوی دوگانه",
    description: "این الگو یک قانون ساده و یک قانون تکرارشونده دارد.",
    caseLabel: "الگوی یکی در میان",
    sequence: ["۳", "۵", "۹", "۱۱", "۱۵", "۱۷", "?"],
    options: ["۱۸", "۱۹", "۲۰", "۲۱"],
    answer: 1,
    explanation:
      "یک بار ۲ واحد و بار بعد ۴ واحد اضافه می‌شود؛ پس بعد از ۱۷، عدد ۱۹ قرار می‌گیرد.",
  },
  {
    icon: "🧩",
    title: "پرونده پنجم: رمز نهایی کارآگاه",
    description: "اختلاف بین عددهای متوالی را پیدا کن.",
    caseLabel: "الگوی پیشرفته",
    sequence: ["۲", "۶", "۱۲", "۲۰", "۳۰", "۴۲", "?"],
    options: ["۴۸", "۵۲", "۵۴", "۵۶"],
    answer: 3,
    explanation:
      "اختلاف‌ها به ترتیب ۴، ۶، ۸، ۱۰ و ۱۲ هستند. اختلاف بعدی ۱۴ است؛ پس ۴۲ + ۱۴ = ۵۶.",
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

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

const elements = {
  score: document.getElementById("score"),
  mission: document.getElementById("mission"),
  lives: document.getElementById("lives"),
  progress: document.getElementById("progress"),
  missionTag: document.getElementById("missionTag"),
  questionIcon: document.getElementById("questionIcon"),
  caseLabel: document.getElementById("caseLabel"),
  question: document.getElementById("question"),
  description: document.getElementById("description"),
  sequence: document.getElementById("sequence"),
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

function toPersian(value) {
  return String(value).replace(/\d/g, (digit) => persianDigits[digit]);
}

function updateStats() {
  elements.score.textContent = toPersian(state.score);

  elements.mission.textContent = `${toPersian(state.currentQuestion + 1)} از ${toPersian(TOTAL_QUESTIONS)}`;

  elements.lives.textContent =
    "❤️".repeat(state.lives) + "🖤".repeat(3 - state.lives);

  elements.progress.style.width = `${(state.currentQuestion / TOTAL_QUESTIONS) * 100}%`;
}

function renderSequence(sequence) {
  elements.sequence.innerHTML = "";

  sequence.forEach((number, index) => {
    const item = document.createElement("div");
    item.className = "sequence-item";

    if (number === "?") {
      item.classList.add("missing");
    }

    item.textContent = number;

    elements.sequence.appendChild(item);

    if (index < sequence.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "sequence-arrow";
      arrow.textContent = "←";

      elements.sequence.appendChild(arrow);
    }
  });
}

function renderQuestion() {
  if (state.finished) return;

  const question = questions[state.currentQuestion];

  state.answered = false;

  elements.missionTag.textContent = `پرونده ${toPersian(state.currentQuestion + 1)}`;

  elements.questionIcon.textContent = question.icon;
  elements.caseLabel.textContent = `${question.caseLabel} | پرونده ${toPersian(state.currentQuestion + 1)}`;

  elements.question.textContent = question.title;
  elements.description.textContent = question.description;

  renderSequence(question.sequence);

  elements.options.innerHTML = "";
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  elements.nextBtn.disabled = true;

  elements.nextBtn.textContent =
    state.currentQuestion === TOTAL_QUESTIONS - 1
      ? "مشاهده نتیجه نهایی 🏆"
      : "بررسی پرونده بعدی ←";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option";
    button.textContent = toPersian(option);

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

    elements.feedback.textContent = `✅ آفرین کارآگاه! ${question.explanation}`;

    elements.feedback.className = "feedback success";
  } else {
    state.lives--;

    selectedButton.classList.add("wrong");
    optionButtons[question.answer].classList.add("correct");

    elements.feedback.textContent = `❌ پاسخ درست ${toPersian(question.options[question.answer])} است. ${question.explanation}`;

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
    elements.resultTitle.textContent = "کارآگاه نابغه!";
    elements.resultMessage.textContent =
      "تبریک! تمام پرونده‌ها را حل کردی و رمز الگوها را کشف کردی.";
  } else if (state.correctCount >= 3) {
    elements.resultIcon.textContent = "🥈";
    elements.resultTitle.textContent = "کارآگاه پرتلاش!";
    elements.resultMessage.textContent =
      "بیشتر سرنخ‌ها را درست پیدا کردی. با تمرین بیشتر، استاد الگوها می‌شوی.";
  } else {
    elements.resultIcon.textContent = "💪";
    elements.resultTitle.textContent = "پرونده‌ها هنوز باز هستند!";
    elements.resultMessage.textContent =
      "دوباره تلاش کن و این بار با دقت بیشتری رابطه عددها را بررسی کن.";
  }

  elements.finalScore.textContent = toPersian(state.score);

  elements.resultDetails.innerHTML = `
    پرونده‌های حل‌شده: ${toPersian(state.correctCount)} از ${toPersian(TOTAL_QUESTIONS)}<br>
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
