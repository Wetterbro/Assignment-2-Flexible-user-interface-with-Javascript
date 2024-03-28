import { getRandomQuestions } from "./dataHandler.js";

// Variable to store the questions
let displayedQuestions = [];

  // Display questions
  async function displayQuizQuestions() {

    console.log("runs");
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";

    // fetching shuffled questions and stores them
    displayedQuestions = await getRandomQuestions(10)
 
    

    displayedQuestions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("card", "mb-3");
      questionDiv.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${index + 1}. ${q.question}</h5>
          <div class="form-check">
            ${q.possibleAnswers.map((option, i) => `
              <input class="form-check-input" type="radio" name="question${index}" id="option${index}-${i}" value="${option}">
              <label class="form-check-label" for="option${index}-${i}">${option}</label><br>
            `).join('')}
          </div>
        </div>
      `;
      quizDiv.appendChild(questionDiv);
    });
  }

  //displayQuizQuestions();

  // Check answers on submit
  document.getElementById("submitBtn").addEventListener("click", () => {
    let score = 0;
    
    
    displayedQuestions.forEach((q, index) => {
      const selectedOption = document.querySelector
      (`input[name="question${index}"]:checked`);
      
      if (selectedOption) {
        if (selectedOption.value === q.correctAnswer) {
          score++;
        }else{
        // Feedback if Incorrect answer
        alert(`Incorrect! The correct answer is ${q.correctAnswer}`);
        }
      }
    });
    //Feedback if Correct Answer
    alert(`Correct! Your score is: ${score}/${displayedQuestions.length}`);
  });

    // Display Questions when refresh browser
  displayQuizQuestions();