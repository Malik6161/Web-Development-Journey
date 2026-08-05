const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

const categoryButtons = document.querySelectorAll(".category-btn");

const currentQuestionElement = document.getElementById("currentQuestion");
const totalQuestionsElement = document.getElementById("totalQuestions");
const resultTotalQuestions = document.getElementById("resultTotalQuestions");

const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

const questionElement = document.getElementById("question");
const questionCategory = document.getElementById("questionCategory");
const answersContainer = document.getElementById("answers");

const feedbackElement = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

const scorePercentage = document.getElementById("scorePercentage");
const correctAnswersElement = document.getElementById("correctAnswers");
const wrongAnswersElement = document.getElementById("wrongAnswers");
const resultMessage = document.getElementById("resultMessage");
const scoreCircle = document.querySelector(".score-circle");

let selectedCategory = "general";
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer = null;
let answered = false;

const quizQuestions = {
    general: [
        {
            question: "What is the capital city of France?",
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Venus", "Mars", "Jupiter", "Mercury"],
            correct: 1
        },
        {
            question: "How many continents are there in the world?",
            answers: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Which is the largest ocean on Earth?",
            answers: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Arctic Ocean",
                "Pacific Ocean"
            ],
            correct: 3
        },
        {
            question: "What is the currency of Japan?",
            answers: ["Yuan", "Won", "Yen", "Dollar"],
            correct: 2
        },
        {
            question: "Which animal is known as the King of the Jungle?",
            answers: ["Tiger", "Lion", "Elephant", "Leopard"],
            correct: 1
        },
        {
            question: "How many days are there in a leap year?",
            answers: ["365", "366", "364", "367"],
            correct: 1
        },
        {
            question: "Which country is famous for the pyramids of Giza?",
            answers: ["Greece", "Egypt", "Mexico", "Turkey"],
            correct: 1
        },
        {
            question: "What is the largest mammal in the world?",
            answers: [
                "Elephant",
                "Giraffe",
                "Blue Whale",
                "Hippopotamus"
            ],
            correct: 2
        },
        {
            question: "Which language has the most native speakers worldwide?",
            answers: [
                "English",
                "Spanish",
                "Hindi",
                "Mandarin Chinese"
            ],
            correct: 3
        }
    ],

    science: [
        {
            question: "What is the chemical symbol for water?",
            answers: ["CO2", "H2O", "O2", "NaCl"],
            correct: 1
        },
        {
            question: "Which organ pumps blood throughout the human body?",
            answers: ["Brain", "Liver", "Heart", "Lung"],
            correct: 2
        },
        {
            question: "What force keeps planets in orbit around the Sun?",
            answers: [
                "Magnetism",
                "Gravity",
                "Friction",
                "Electricity"
            ],
            correct: 1
        },
        {
            question: "How many bones are there in an adult human body?",
            answers: ["186", "206", "226", "256"],
            correct: 1
        },
        {
            question: "What gas do plants absorb during photosynthesis?",
            answers: [
                "Oxygen",
                "Nitrogen",
                "Carbon Dioxide",
                "Hydrogen"
            ],
            correct: 2
        },
        {
            question: "What is the nearest star to Earth?",
            answers: [
                "Sirius",
                "Polaris",
                "The Sun",
                "Proxima Centauri"
            ],
            correct: 2
        },
        {
            question: "What is the boiling point of water at sea level?",
            answers: ["50°C", "75°C", "100°C", "120°C"],
            correct: 2
        },
        {
            question: "Which part of the cell contains genetic material?",
            answers: [
                "Nucleus",
                "Ribosome",
                "Cell Wall",
                "Cytoplasm"
            ],
            correct: 0
        },
        {
            question: "Which vitamin is mainly produced by sunlight exposure?",
            answers: [
                "Vitamin A",
                "Vitamin B",
                "Vitamin C",
                "Vitamin D"
            ],
            correct: 3
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: [
                "Gold",
                "Iron",
                "Diamond",
                "Quartz"
            ],
            correct: 2
        }
    ],

    technology: [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlink Text Management Language",
                "Home Tool Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which language is mainly used to style web pages?",
            answers: ["HTML", "CSS", "JavaScript", "Python"],
            correct: 1
        },
        {
            question: "Which language is used to add interactivity to web pages?",
            answers: ["CSS", "HTML", "JavaScript", "SQL"],
            correct: 2
        },
        {
            question: "What does CPU stand for?",
            answers: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Computer Processing Utility"
            ],
            correct: 0
        },
        {
            question: "Which company developed the Windows operating system?",
            answers: ["Apple", "Google", "Microsoft", "IBM"],
            correct: 2
        },
        {
            question: "What does RAM stand for?",
            answers: [
                "Read Access Memory",
                "Random Access Memory",
                "Rapid Application Memory",
                "Run Access Module"
            ],
            correct: 1
        },
        {
            question: "Which language is known for creating Android applications?",
            answers: ["Kotlin", "HTML", "CSS", "SQL"],
            correct: 0
        },
        {
            question: "What does URL stand for?",
            answers: [
                "Uniform Resource Locator",
                "Universal Reference Link",
                "Unified Resource Language",
                "User Resource Locator"
            ],
            correct: 0
        },
        {
            question: "Which technology is used to manage databases?",
            answers: ["SQL", "CSS", "HTML", "XML"],
            correct: 0
        },
        {
            question: "Which device is primarily used to connect computers to a network?",
            answers: [
                "Monitor",
                "Router",
                "Keyboard",
                "Printer"
            ],
            correct: 1
        }
    ],

    history: [
        {
            question: "Who was the first President of the United States?",
            answers: [
                "Abraham Lincoln",
                "George Washington",
                "Thomas Jefferson",
                "John Adams"
            ],
            correct: 1
        },
        {
            question: "In which year did World War II end?",
            answers: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Who built the Taj Mahal?",
            answers: [
                "Akbar",
                "Shah Jahan",
                "Aurangzeb",
                "Babur"
            ],
            correct: 1
        },
        {
            question: "Which ancient civilization built Machu Picchu?",
            answers: ["Roman", "Greek", "Inca", "Egyptian"],
            correct: 2
        },
        {
            question: "Who was known as the Maid of Orléans?",
            answers: [
                "Cleopatra",
                "Joan of Arc",
                "Marie Curie",
                "Queen Victoria"
            ],
            correct: 1
        },
        {
            question: "The Great Wall is located in which country?",
            answers: ["Japan", "China", "India", "Korea"],
            correct: 1
        },
        {
            question: "Who discovered penicillin?",
            answers: [
                "Alexander Fleming",
                "Louis Pasteur",
                "Isaac Newton",
                "Albert Einstein"
            ],
            correct: 0
        },
        {
            question: "Which empire was ruled by Julius Caesar?",
            answers: [
                "Roman Empire",
                "Ottoman Empire",
                "Mongol Empire",
                "British Empire"
            ],
            correct: 0
        },
        {
            question: "The Renaissance began in which country?",
            answers: ["France", "Italy", "Spain", "Germany"],
            correct: 1
        },
        {
            question: "Who was the first person to walk on the Moon?",
            answers: [
                "Buzz Aldrin",
                "Yuri Gagarin",
                "Neil Armstrong",
                "Michael Collins"
            ],
            correct: 2
        }
    ]
};

const categoryNames = {
    general: "General Knowledge",
    science: "Science",
    technology: "Technology",
    history: "History"
};

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;
    });
});

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
homeBtn.addEventListener("click", showHome);
nextBtn.addEventListener("click", nextQuestion);

function startQuiz() {
    clearInterval(timer);

    questions = [...quizQuestions[selectedCategory]];

    shuffleQuestions(questions);

    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    totalQuestionsElement.textContent = questions.length;
    resultTotalQuestions.textContent = questions.length;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);

    answered = false;

    feedbackElement.textContent = "";
    feedbackElement.style.color = "";

    nextBtn.style.visibility = "hidden";

    const currentQuestion = questions[currentQuestionIndex];

    currentQuestionElement.textContent = currentQuestionIndex + 1;
    questionCategory.textContent = categoryNames[selectedCategory];
    questionElement.textContent = currentQuestion.question;

    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    answersContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    currentQuestion.answers.forEach(function (answer, index) {
        const button = document.createElement("button");

        button.className = "answer-btn";

        button.innerHTML = `
            <span class="answer-number">${letters[index]}</span>
            <span class="answer-text">${answer}</span>
        `;

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        answersContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);

    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timerElement.parentElement.style.color = "var(--warning)";

    timer = setInterval(function () {
        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 5) {
            timerElement.parentElement.style.color = "var(--danger)";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timer);

    const currentQuestion = questions[currentQuestionIndex];
    const allAnswerButtons = document.querySelectorAll(".answer-btn");

    allAnswerButtons.forEach(function (button) {
        button.classList.add("disabled");
    });

    if (selectedAnswer === currentQuestion.correct) {
        score++;

        selectedButton.classList.add("correct");

        feedbackElement.textContent = "✓ Correct answer!";
        feedbackElement.style.color = "var(--success)";
    } else {
        selectedButton.classList.add("wrong");

        allAnswerButtons[currentQuestion.correct].classList.add("correct");

        feedbackElement.textContent = "✕ Incorrect answer!";
        feedbackElement.style.color = "var(--danger)";
    }

    showNextButton();
}

function timeUp() {
    if (answered) {
        return;
    }

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const allAnswerButtons = document.querySelectorAll(".answer-btn");

    allAnswerButtons.forEach(function (button) {
        button.classList.add("disabled");
    });

    allAnswerButtons[currentQuestion.correct].classList.add("correct");

    feedbackElement.textContent = "⏰ Time's up!";
    feedbackElement.style.color = "var(--warning)";

    showNextButton();
}

function showNextButton() {
    nextBtn.style.visibility = "visible";

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerHTML = `
            Finish Quiz
            <span>✓</span>
        `;
    } else {
        nextBtn.innerHTML = `
            Next Question
            <span>→</span>
        `;
    }
}

function nextQuestion() {
    if (!answered) {
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const total = questions.length;
    const wrong = total - score;
    const percentage = Math.round((score / total) * 100);
    const degrees = percentage * 3.6;

    correctAnswersElement.textContent = score;
    wrongAnswersElement.textContent = wrong;
    resultTotalQuestions.textContent = total;
    scorePercentage.textContent = `${percentage}%`;

    scoreCircle.style.background = `
        radial-gradient(
            circle,
            var(--bg-secondary) 58%,
            transparent 59%
        ),
        conic-gradient(
            var(--primary) 0deg ${degrees}deg,
            rgba(255, 255, 255, 0.08) ${degrees}deg 360deg
        )
    `;

    if (percentage === 100) {
        resultMessage.textContent =
            "Perfect score! You absolutely mastered this quiz.";
    } else if (percentage >= 80) {
        resultMessage.textContent =
            "Excellent work! You have a strong knowledge of this topic.";
    } else if (percentage >= 60) {
        resultMessage.textContent =
            "Good job! Keep practicing and you can reach an even higher score.";
    } else if (percentage >= 40) {
        resultMessage.textContent =
            "Not bad! Review the topics and give the quiz another try.";
    } else {
        resultMessage.textContent =
            "Keep learning! Practice makes progress, so try again.";
    }
}

function showHome() {
    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    feedbackElement.textContent = "";

    nextBtn.innerHTML = `
        Next Question
        <span>→</span>
    `;
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] = [
            array[randomIndex],
            array[i]
        ];
    }
}