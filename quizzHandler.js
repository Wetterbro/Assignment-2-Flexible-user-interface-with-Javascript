let stats;

document.onload = () => {
    if (!localStorage.getItem("stats")) {
        stats = {
            correctAnswers: 0,
            wrongAnswers: 0,
            questionsAnswered: 0
        };
        localStorage.setItem("stats", JSON.stringify(stats));
    } else {
        stats = JSON.parse(localStorage.getItem("stats"));
    }
}

export function updateStats(correctAnswers) {
    stats.questionsAnswered++;
    if (correctAnswers) {
        stats.correctAnswers++;
    } else {
        stats.wrongAnswers++;
    }

    localStorage.setItem("stats", JSON.stringify(stats));
}

export function getStats() {
    return stats;
}

export function resetStats() {
    stats = {
        correctAnswers: 0,
        wrongAnswers: 0,
        questionsAnswered: 0
    };
    localStorage.setItem("stats", JSON.stringify(stats));
}