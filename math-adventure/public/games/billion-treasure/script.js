const GAME_ID = "billion-treasure";
const TOTAL_QUESTIONS = 5;
const POINTS_PER_ANSWER = 20;

const questions = [
  {
    title: "عدد ۱٬۲۰۵٬۰۰۰٬۰۰۰ چگونه خوانده می‌شود؟",
    description: "به عدد دقت کن و گزینه درست را انتخاب کن.",
    icon: "📜",
    options: [
      "یک میلیارد و دویست و پنج میلیون",
      "یک میلیارد و بیست و پنج میلیون",
      "دوازده میلیارد و پنج میلیون",
      "یک میلیارد و دویست و پنجاه میلیون",
    ],
    answer: 0,
    explanation: "آفرین! این عدد برابر با یک میلیارد و دویست و پنج میلیون است.",
  },
  {
    title: "کدام عدد با عبارت زیر برابر است؟",
    description: "دو میلیارد و سی و پنج میلیون و هفت هزار",
    icon: "🔐",
    options: [
      "۲٬۳۵۰٬۰۰۷٬۰۰۰",
      "۲٬۰۳۵٬۰۰۷٬۰۰۰",
      "۲٬۰۳۰٬۵۰۷٬۰۰۰",
      "۲٬۰۰۳٬۵۰۷٬۰۰۰",
    ],
    answer: 1,
    explanation:
      "درست است! دو میلیارد، سی و پنج میلیون و هفت هزار می‌شود ۲٬۰۳۵٬۰۰۷٬۰۰۰.",
  },
  {
    title: "ارزش رقم مشخص‌شده چقدر است؟",
    description: "در عدد ۴٬۷۱۸٬۲۵۰٬۰۰۰، ارزش رقم ۷ را پیدا کن.",
    icon: "💎",
    options: ["۷۰٬۰۰۰٬۰۰۰", "۷٬۰۰۰٬۰۰۰", "۷۰۰٬۰۰۰٬۰۰۰", "۷٬۰۰۰٬۰۰۰٬۰۰۰"],
    answer: 2,
    explanation:
      "آفرین! رقم ۷ در مرتبه صدگان میلیون قرار دارد؛ پس ارزش آن ۷۰۰ میلیون است.",
  },
  {
    title: "کدام گزینه شکل گسترده عدد زیر است؟",
    description: "۳٬۰۴۰٬۲۰۶٬۰۱۵",
    icon: "🧩",
    options: [
      "۳٬۰۰۰٬۰۰۰٬۰۰۰ + ۴۰٬۰۰۰٬۰۰۰ + ۲۰۰٬۰۰۰ + ۶٬۰۰۰ + ۱۰ + ۵",
      "۳٬۰۰۰٬۰۰۰٬۰۰۰ + ۴٬۰۰۰٬۰۰۰ + ۲۰۰٬۰۰۰ + ۶٬۰۰۰ + ۱۰ + ۵",
      "۳٬۰۰۰٬۰۰۰٬۰۰۰ + ۴۰٬۰۰۰٬۰۰۰ + ۲۰٬۰۰۰ + ۶٬۰۰۰ + ۱۰ + ۵",
      "۳٬۰۰۰٬۰۰۰٬۰۰۰ + ۴۰٬۰۰۰٬۰۰۰ + ۲۰۰٬۰۰۰ + ۶۰۰ + ۱۰ + ۵",
    ],
    answer: 0,
    explanation:
      "درست است! هر رقم را بر اساس ارزش مکانی خودش می‌نویسیم و رقم‌های صفر را حذف می‌کنیم.",
  },
  {
    title: "کدام عدد بزرگ‌تر است؟",
    description: "دو گنجینه را مقایسه کن!",
    icon: "🏆",
    options: [
      "۵٬۰۹۰٬۰۰۰٬۰۰۰",
      "۵٬۹۰۰٬۰۰۰٬۰۰۰",
      "هر دو برابرند",
      "اطلاعات کافی نیست",
    ],
    answer: 1,
    explanation:
      "آفرین! هر دو عدد ۵ میلیارد دارند؛ اما در مرتبه صدگان میلیون، عدد دوم ۹ و عدد اول صفر دارد.",
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

const persianDigits = "0123456789";

function toPersian(value) {
  return String(value).replace(/\d/g, (digit) => persianDigits[digit]);
}

function updateStats() {
  elements.score.textContent = toPersian(state.score);

  elements.mission.textContent = `${toPersian(Math.min(state.currentQuestion + 1, TOTAL_QUESTIONS))} از ${toPersian(TOTAL_QUESTIONS)}`;

  elements.lives.textContent =
    "❤️".repeat(state.lives) + "🖤".repeat(3 - state.lives);

  const progress = (state.currentQuestion / TOTAL_QUESTIONS) * 100;
  elements.progress.style.width = `${progress}%`;
}

function renderQuestion() {
  if (state.finished) return;

  const question = questions[state.currentQuestion];

  state.answered = false;

  elements.missionTag.textContent = `مأموریت ${toPersian(state.currentQuestion + 1)}`;

  elements.questionIcon.textContent = question.icon;
  elements.question.textContent = question.title;
  elements.description.textContent = question.description;

  elements.options.innerHTML = "";
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  elements.nextBtn.disabled = true;
  elements.nextBtn.textContent =
    state.currentQuestion === TOTAL_QUESTIONS - 1
      ? "مشاهده نتیجه نهایی 🏆"
      : "مأموریت بعدی ←";

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

    elements.feedback.textContent = `✅ ${question.explanation}`;
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

  elements.progress.style.width = `${((state.currentQuestion + (state.answered ? 1 : 0)) / TOTAL_QUESTIONS) * 100}%`;

  elements.resultScreen.classList.remove("hidden");

  if (completed) {
    elements.resultIcon.textContent = "🏆";
    elements.resultTitle.textContent = "تبریک قهرمان!";
    elements.resultMessage.textContent =
      "تو تمام رمزهای گنجینه میلیارد را کشف کردی!";
  } else if (state.correctCount >= 3) {
    elements.resultIcon.textContent = "🥈";
    elements.resultTitle.textContent = "ماجراجوی پرتلاش!";
    elements.resultMessage.textContent =
      "عملکرد خوبی داشتی! با کمی تمرین می‌توانی همه مراحل را کامل کنی.";
  } else {
    elements.resultIcon.textContent = "💪";
    elements.resultTitle.textContent = "تلاش خوبی بود!";
    elements.resultMessage.textContent =
      "هنوز فرصت داری دوباره تمرین کنی و گنجینه را به دست بیاوری.";
  }

  elements.finalScore.textContent = toPersian(state.score);

  elements.resultDetails.innerHTML = `
    تعداد پاسخ‌های درست: ${toPersian(state.correctCount)} از ${toPersian(TOTAL_QUESTIONS)}<br>
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
