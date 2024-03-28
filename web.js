import { getRandomQuestions } from "./dataHandler.js";
import {initStats ,resetStats , updateStats} from "./statsHandler.js";

// Variable to store the questions
let displayedQuestions = [];
let currentQuestion = 0;
const amountOfQuestions = 10;
let score = 0;

// Initialize stats
initStats();

// Display questions
async function initQuiz() {
  displayedQuestions = await getRandomQuestions(10)
  renderQuestion(displayedQuestions, currentQuestion)
}


function renderQuestion(q, index) {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("card", "mb-3");
  questionDiv.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${index + 1}. ${q[index].question}</h5>
      <div class="form-check">
      ${q[index].possibleAnswers.map((option, i) => `
      <input class="form-check-input" type="radio" name="question${index}" id="option${index}-${i}" value="${option}">
      <label class="form-check-label" for="option${index}-${i}">${option}</label><br>
    `).join('')}
      </div>
    </div>
  `;
  quizDiv.appendChild(questionDiv);
};

//Handle the function of the submit button
document.getElementById("submitBtn").addEventListener("click", () => {
  const selectedOption = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
  if (selectedOption) {
    if (selectedOption.value === displayedQuestions[currentQuestion].correctAnswer) {
      score++;
      updateStats(true);
      displayResultMessage("Correct!", "green");
    } else {
      updateStats(false);
      displayResultMessage("Incorrect!", "red");
    }
  } else {
    displayResultMessage("Please select an option before moving to the next question.", "yellow");
    return; // Stop the function here if no option is selected
  }

  currentQuestion++;
  if (currentQuestion < amountOfQuestions) {
    renderQuestion(displayedQuestions, currentQuestion);
  } else {
    document.getElementById("quizPage").classList.add("d-none");
    document.getElementById("resultPage").classList.add("d-none");
    quizResults();
  }
});

//Shows the results of the quiz
function quizResults() {
  document.getElementById("resultPage").classList.remove("d-none");

  //Display final score
  document.getElementById("finalScore").textContent = `Your score is: ${score}/${amountOfQuestions}`;

  //button to go back to start page
  document.getElementById("resultHomeBtn").addEventListener("click", () => {
    document.getElementById("resultPage").classList.add("d-none");
    document.getElementById("startPage").classList.remove("d-none");
    startPage();
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    document.getElementById("quizPage").classList.remove("d-none");
    document.getElementById("resultPage").classList.add("d-none");
    currentQuestion = 0;
    score = 0;
    initQuiz();
  });
}

//renders the start page
function startPage() {
  const startPageElement = document.getElementById("startPage");
  startPageElement.innerHTML = `
    <h1>Welcome to the Quiz!</h1>
    <p>Click the button below to start the quiz.</p>
    <button id="startQuizBtn" class="btn btn-primary">Start Quiz</button>
    <h2 id="stats">Stats</h2>
    <ul id="stats" class="list-group mt-3">
      <li class="list-group-item">Correct Answers: ${JSON.parse(localStorage.getItem("stats")).correctAnswers}</li>
      <li class="list-group-item">Wrong Answers: ${JSON.parse(localStorage.getItem("stats")).wrongAnswers}</li>
      <li class="list-group-item">Questions Answered: ${JSON.parse(localStorage.getItem("stats")).questionsAnswered}</li>
    </ul>
    <button id="resetStatsBtn" class="btn btn-danger">Reset Stats</button>
  `;

  document.getElementById("resetStatsBtn").classList.add("mt-3");
  document.getElementById("stats").classList.add("mt-3");

  document.getElementById("resetStatsBtn").addEventListener("click", () => {
    resetStats();
    displayResultMessage("Stats have been reset!", "green");
    startPage();
  });

  document.getElementById("startQuizBtn").addEventListener("click", () => {
    startPageElement.classList.add("d-none");
    document.getElementById("quizPage").classList.remove("d-none");
    currentQuestion = 0;
    score = 0;
    initQuiz();
  });
}

// Function to display a message to the user, takes a message and a color of the alert box as arguments
function displayResultMessage(Result, color) {
  const resultMessageContainer = document.getElementById("result-message-container");

  // Check if a message already exists
  const existingMessage = resultMessageContainer.querySelector(".alert");
  if (existingMessage) {
    existingMessage.remove();
  }

  const successMessage = document.createElement("div");
  successMessage.textContent = Result;
  switch (color) {
    case "green":
      successMessage.classList.add("alert", "alert-success", "mt-3");
      break;
    case "red":
      successMessage.classList.add("alert", "alert-danger", "mt-3");
      break;
    case "yellow":
      successMessage.classList.add("alert", "alert-warning", "mt-3");
      break;
    default:
      successMessage.classList.add("alert", "alert-primary", "mt-3");
      break;
  }

  resultMessageContainer.appendChild(successMessage);

  // Hide success message after 2 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

// Start the app
startPage();

