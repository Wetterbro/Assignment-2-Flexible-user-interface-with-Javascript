export async function fetchQuestionsi(){
    let response =  await fetch("https://da-demo.github.io/api/futurama/questions/");
    const questions = await response.json();
    return questions
}

export async function getRandomQuestions(amount){
    const questions = await fetchQuestionsi();
    
    if (!questions) {
        return null;
    }

    if (questions.length <= 5) {
        return questions;
    }

    var shuffledQuestions = questions.slice().sort(() => Math.random() - 0.5);
    return await shuffledQuestions.slice(0, amount);
}