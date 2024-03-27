import { getRandomQuestions } from "./dataHandler.js";


  // Display questions
  async function displayQuizQuestions() {

    console.log("runs");
    const quizDiv = document.getElementById("quiz");

    var quizQuestions = await getRandomQuestions(10);
 
    

    quizQuestions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("card", "mb-3");
      questionDiv.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${index + 1}. ${q}</h5>
          <div class="form-check">
            ${q.options.map((option, i) => `
              <input class="form-check-input" type="radio" name="question${index}" id="option${index}-${i}" value="${option}">
              <label class="form-check-label" for="option${index}-${i}">${option}</label><br>
            `).join('')}
          </div>
        </div>
      `;
      quizDiv.appendChild(questionDiv);
    });
  }

  displayQuizQuestions();

  // Check answers on submit
  document.getElementById("submitBtn").addEventListener("click", () => {
    let score = 0;
    const quizQuestions = fetchQuizQuestions();
    quizQuestions.forEach((q, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption) {
        if (selectedOption.value === q.answer) {
          score++;
        }
      }
    });
    alert(`Your score is: ${score}/${quizQuestions.length}`);
  });