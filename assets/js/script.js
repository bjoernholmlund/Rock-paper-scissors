const quiz = {
    easy: [
        {
            question: "Vilken färg har himlen på en klar dag?",
            options: ["Blå", "Grön", "Röd", "Gul"],
            answer: "Blå"
        },
        {
            question: "Vad är 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        }
    ],
    medium: [
        {
            question: "Vilken är världens största ö?",
            options: ["Grönland", "Madagaskar", "Borneo", "Storbritannien"],
            answer: "Grönland"
        },
        {
            question: "Vilket år landade Apollo 11 på månen?",
            options: ["1965", "1969", "1972", "1959"],
            answer: "1969"
        }
    ],
    hard: [
        {
            question: "Vilket är det största djuret i världen?",
            options: ["Elefant", "Blåval", "Haj", "Giraff"],
            answer: "Blåval"
        },
        {
            question: "Vilken planet är känd som den röda planeten?",
            options: ["Mars", "Jupiter", "Venus", "Saturnus"],
            answer: "Mars"
        }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let selectedDifficulty = 'easy';

const questionElement = document.getElementById('question');
const optionsElement = document.querySelectorAll('.option');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-question');
const difficultyButtons = document.querySelectorAll('.difficulty');

difficultyButtons.forEach(button => {
    button.onclick = () => {
        selectedDifficulty = button.id;
        startQuiz();
    };
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('difficulty-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = quiz[selectedDifficulty][currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.onclick = () => checkAnswer(button.textContent);
    });
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
}

function checkAnswer(selectedOption) {
    const currentQuestion = quiz[selectedDifficulty][currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        feedbackElement.textContent = "Rätt!";
        score++;
    } else {
        feedbackElement.textContent = `Fel! Rätt svar är ${currentQuestion.answer}.`;
    }
    nextButton.style.display = 'inline';
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz[selectedDifficulty].length) {
        loadQuestion();
    } else {
        endQuiz();
    }
};

function endQuiz() {
    questionElement.textContent = `Spelet över! Du fick ${score} av ${quiz[selectedDifficulty].length} rätt.`;
    document.getElementById('options').style.display = 'none';
    nextButton.style.display = 'none';
}
