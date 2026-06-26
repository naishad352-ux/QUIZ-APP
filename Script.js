const quizConfig = {
    title: "JavaScript Quiz",

    resultType: "pass/fail", // score | percentage | pass/fail

    passPercentage: 50,

    questions: [
        {
            text: "What does HTML stand for?",
            type: "radio",
            points: 10,
            options: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks Text Mark Language",
                "Hyper Tool Multi Language"
            ],
            correctAnswers: [
                "Hyper Text Markup Language"
            ]
        },

        {
            text: "Which are JavaScript Array Methods?",
            type: "multiselect",
            points: 20,
            options: [
                "map()",
                "filter()",
                "print()",
                "reduce()"
            ],
            correctAnswers: [
                "map()",
                "filter()",
                "reduce()"
            ]
        },

        {
            text: "Which company developed JavaScript?",
            type: "radio",
            points: 10,
            options: [
                "Microsoft",
                "Netscape",
                "Google",
                "Apple"
            ],
            correctAnswers: [
                "Netscape"
            ]
        }
    ]
};

const quizTitle = document.getElementById("quiz-title");
const quizContainer = document.getElementById("quiz-container");
const quizForm = document.getElementById("quiz-form");
const resultDiv = document.getElementById("result");

quizTitle.textContent = quizConfig.title;

/* Generate Questions Dynamically */
quizConfig.questions.forEach((question, index) => {

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    let optionsHTML = "";

    question.options.forEach(option => {

        optionsHTML += `
            <div class="option">
                <label>
                    <input
                        type="${question.type === "radio" ? "radio" : "checkbox"}"
                        name="question-${index}"
                        value="${option}"
                    >
                    ${option}
                </label>
            </div>
        `;
    });

    questionDiv.innerHTML = `
        <h3>${index + 1}. ${question.text}</h3>
        ${optionsHTML}
    `;

    quizContainer.appendChild(questionDiv);
});

/* Submit Event */
quizForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let totalScore = 0;

    const maxScore = quizConfig.questions.reduce(
        (sum, question) => sum + question.points,
        0
    );

    quizConfig.questions.forEach((question, index) => {

        const selectedInputs = document.querySelectorAll(
            `input[name="question-${index}"]:checked`
        );

        const selectedAnswers = [...selectedInputs].map(
            input => input.value
        );

        const correctAnswers = question.correctAnswers;

        const isCorrect =
            selectedAnswers.length === correctAnswers.length &&
            selectedAnswers.every(answer =>
                correctAnswers.includes(answer)
            );

        if (isCorrect) {
            totalScore += question.points;
        }
    });

    const percentage =
        ((totalScore / maxScore) * 100).toFixed(2);

    let resultHTML = `
        <p>Score: ${totalScore} / ${maxScore}</p>
        <p>Percentage: ${percentage}%</p>
    `;

    if (quizConfig.resultType === "score") {

        resultHTML = `
            <p>Total Score: ${totalScore}</p>
        `;

    } else if (quizConfig.resultType === "percentage") {

        resultHTML = `
            <p>Percentage: ${percentage}%</p>
        `;

    } else if (quizConfig.resultType === "pass/fail") {

        const status =
            percentage >= quizConfig.passPercentage
                ? "PASS ✅"
                : "FAIL ❌";

        resultHTML += `
            <p>Status: ${status}</p>
        `;
    }

    resultDiv.innerHTML = resultHTML;
});