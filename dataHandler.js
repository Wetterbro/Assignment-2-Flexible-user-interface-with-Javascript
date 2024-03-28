export async function fetchQuestions() {
    let response = await fetch("https://da-demo.github.io/api/futurama/questions/");
    if (!response.ok) {
        return null;
    }
    const questions = await response.json();
    return questions
}

// Function to get random questions, takes an amount of questions as an argument
export async function getRandomQuestions(amount) {
    const questions = await fetchQuestions();

    if (!questions) {
        return null;
    }

    if (questions.length <= 5) {
        return questions;
    }

    var shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);
    return await shuffledQuestions.slice(0, amount);
}
