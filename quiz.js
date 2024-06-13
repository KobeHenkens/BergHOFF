export class Quiz {
    constructor() {
        this.questions = {};
        this.results = [];
    }   

    addQuestions(questions) {
        this.questions = { ...this.questions, ...questions };
    }

    getRandomQuestion() {
        const questionIds = Object.keys(this.questions);
        if (questionIds.length === 0) { return null; }
        const randomIndex = Math.floor(Math.random() * questionIds.length);
        const randomQuestionId = questionIds[randomIndex];
        return { key: randomQuestionId, ...this.questions[randomQuestionId] }; // Return both key and question data
    }

    showQuiz(questionId, callback) {
        const huidigeQuestion = this.questions[questionId];

        if (!huidigeQuestion) return;

        const popup = document.createElement('div');
        popup.className = 'popup-frame';
        popup.id = 'showQuiz';
        
        let popupContent = `
            <div class="popup-content">
                <h2>${huidigeQuestion.question}</h2>
                <div class="answer-options">
        `;

        huidigeQuestion.options.forEach((option, index) => {
            popupContent += `<a href="#" data-index="${index}">${option}</a>`;
        });

        popupContent += '</div></div>';
        popup.innerHTML = popupContent;
        document.body.appendChild(popup);

        const answerOptions = popup.querySelectorAll('.answer-options a');
        answerOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedIndex = parseInt(option.dataset.index);
                const isCorrect = selectedIndex === huidigeQuestion.correctAnswer;
                const selectedText = option.textContent;
                this.results.push({ question: huidigeQuestion.question, isCorrect, correctAnswer: huidigeQuestion.options[huidigeQuestion.correctAnswer], answer: selectedText });
                popup.remove();
                callback(isCorrect);
    
            });
        });
    }


    getResultsList(){
        return this.results;
    }
}
