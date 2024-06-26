import { Speler } from "./speler"
import { Quiz } from "./quiz"

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.gameState = 'start' // start || playing 
        this.speler = new Speler(this)
        this.quiz = new Quiz()
        this.gameLevel = null
        this.renderPlayer = 1
        this.result = []
        this.selectedImageSrc = null
        this.opgaveResult = []
        this.quizCount = null;


        const questions = {
            'question1': {
                question: 'Wat is een voorbeeld van een energiezuinige kookmethode?',
                options: ['Frituren', 'Stomen', 'Bakken'],
                correctAnswer: 1
            },
            'question2': {
                question: 'Welke hittebron is over het algemeen energie-efficiënter voor koken?',
                options: ['Elektrische kookplaat', 'Inductiekookplaat', 'Gasfornuis'],
                correctAnswer: 2
            },
            'question3': {
                question: 'Welk type kookgerei zorgt voor een gelijkmatigere verdeling van warmte en kan helpen bij energiebesparing?',
                options: ['Aluminium pannen', 'Gietijzeren pannen', 'Koperen pannen'],
                correctAnswer: 1
            },
            'question4': {
                question: 'Hoe kun je energie besparen tijdens het koken op een gasfornuis?',
                options: ['Een grote pan gebruiken voor kleine hoeveelheden voedsel', 'De pan voortijdig van de brander halen', 'De pan bedekken met een deksel tijdens het koken'],
                correctAnswer: 2
            },
            'question5': {
                question: 'Wat is een duurzaam alternatief voor wegwerpbare keukenproducten zoals aluminiumfolie?',
                options: ['Plastic folie', 'Siliconen bakmatten', 'Papieren zakdoekjes'],
                correctAnswer: 1
            },
            'question6': {
                question: 'Welke actie helpt om energie te besparen tijdens het koken op een elektrische kookplaat?',
                options: ['De kookplaat op de hoogste stand zetten', 'Een deksel op de pan houden tijdens het koken', ' Een kleine pan op een grote brander gebruiken'],
                correctAnswer: 2
            },
            
        }
        this.quiz.addQuestions(questions)

    }

    startScherm() {
        const startSchermDisplay = document.querySelector('.start-scherm')
        const startButton = startSchermDisplay.querySelector('button')

        if (this.gameState === 'start') {
            startSchermDisplay.style.display = "block"
            this.canvas.classList.toggle('blur-brightness')

            startButton.addEventListener('click', () => {
                startSchermDisplay.style.display = "none"
                this.canvas.classList.remove('blur-brightness')
                this.startGame()
            })
        }
    }
    startGame() {
        this.gameState = 'playing'
        this.gameLevel = 1
        this.loadlevel(this.gameLevel) // Start level 1
        this.gameLoop() // Start de gameloop
    
    }
    gameLoop() {

        if (this.gameState === 'playing') { 
            this.checkLevelCompletion()
            this.render()
        }
    }
    render() { 

        this.initialiseerBackground() // Teken de achtergrond op de canvas

        if (this.gameState === 'start') {
            // Render het startscherm 
            this.startScherm()

        } else if (this.gameState === 'playing' ) {
            if(this.renderPlayer === 1) {
                const speler = this.speler.idle(-100, 250)  
            } 

            if (this.renderPlayer === 2) {
                this.speler.remove()
                const speler = this.speler.idle(700, 250)  
            }
            if (this.renderPlayer === 3) {
                this.speler.remove()
                const speler = this.speler.idle(700, 250)
            }

            if (this.selectedImageSrc && this.gameLevel === 1) {
                this.drawImageOnCanvas(this.selectedImageSrc, 1330, 350, 150, 150) // Voeg deze regel toe
            }

            
            if (this.selectedImageSrc && this.gameLevel === 2) {
                this.drawImageOnCanvas(this.selectedImageSrc, 1330, 400, 150, 150) // Voeg deze regel toe
            }
        }
    }
    loadlevel(levelNumber) {
        this.clearCanvas()
        if (levelNumber === 1) {
            // POPUP Pasta koken
            this.showPopup(
                'Level1',
                'Opgave Level 1: Kook pasta', 
                'Bij dit level moet je pasta koken, dit doe je zo duurzaam en energieëfficient mogelijk. ',
                 true, 
                 'Kook je water zo energieëfficient',
                  './images/potmetdeksel.png', 
                  './images/potzonderdeksel.png', 
                  './images/potmetdekselenzout.png',
                  false, false, true,
                  (selectedImageSrc) => {
                        this.selectedImageSrc = selectedImageSrc;
                        this.render()

                        // Quizvraag na POPUP pasta koken
                        const randomQuestion = this.quiz.getRandomQuestion()
                        this.quiz.showQuiz(randomQuestion.key, (isCorrect) => {
                            console.log('Quizvraag beantwoord:', isCorrect);
                            this.quizCount++
                            // Check voor level voltooiing na het beantwoorden van de quizvraag
                            this.checkLevelCompletion();
                        })
                    }
                )
            }

            if (levelNumber === 2) {
                this.speler.remove()
                this.renderPlayer = 1
                this.result = []
                this.quizCount = null // Reset de quiz count
                this.selectedImageSrc = null // Reset de selected image for the new level
                this.render()
                this.showPopup(
                    'Level2',
                    'Opgave Level 2: Kook', 
                    'Bij dit level moet je vlees bakken, dit doe je zo duurzaam en energieëfficient mogelijk. ',
                     true, 
                     'Maak je vlees klaar',
                      './images/antiaanbakpan.png', 
                      './images/gietijzenpan.png', 
                      './images/roestvrijstalenpan.png',
                      true, false, false,
                      (selectedImageSrc) => {
                            this.selectedImageSrc = selectedImageSrc;
                            this.render()
    
                            // Quizvraag na POPUP pasta koken
                            const randomQuestion = this.quiz.getRandomQuestion()
                            this.quiz.showQuiz(randomQuestion.key, (isCorrect) => {
                                console.log('Quizvraag beantwoord:', isCorrect);
                                this.quizCount++
                                this.checkLevelCompletion()
                            })
                        }
                    )

            }
    }

    checkLevelCompletion() {

        if (this.gameLevel === 1) {
            const correct_result = [true]

            if (this.result.length === correct_result.length && this.quiz.getResultsList().length === this.quizCount) {
                // Alle vragen zijn beantwoord en quizresultaten zijn verzameld, toon de popup met resultaten
                const correctAnswers = this.quiz.getResultsList()
                const opgaveAnswers = this.opgaveResult
                console.log(correctAnswers)
                console.log(opgaveAnswers)
                this.showLevelCompletionPopup(correctAnswers, opgaveAnswers, 2);
                this.result = []
            }
        }

        if ( this.gameLevel === 2 ) {
            const correct_result = [true]

            if (this.result.length === correct_result.length && this.quiz.getResultsList().length === this.quizCount) {
                // Alle vragen zijn beantwoord en quizresultaten zijn verzameld, toon de popup met resultaten
                const correctAnswers = this.quiz.getResultsList()
                const opgaveAnswers = this.opgaveResult
                console.log(correctAnswers)
                console.log(opgaveAnswers)
                this.showLevelCompletionPopup(correctAnswers, opgaveAnswers, 3);
            }

        }

    }

    showLevelCompletionPopup(correctAnswers, opgaveAnswers, level) {
        const resultPopup = document.createElement('div');
        resultPopup.className = 'popup-frame';
        resultPopup.id = 'level-completion-popup';

        let popupContent = `
            <div id="levelCompleted" class="popup-content">
                <h2>Level Completed</h2>
        `;

        opgaveAnswers.forEach((answer) => {
            popupContent += `
                <h3>Feedback Opgave</h3>
                <p>${answer}!</p>
                <hr> 
            `; // <hr> voor de witte lijn omdat ik geen box eronder kon zetten :)
        });

        correctAnswers.forEach((answer, index) => {
            popupContent += `
                <h3>Feedback Quiz</h3>
                <p><span>Vraag ${index + 1}:</span> ${answer.question}</p>
                <p><span>Jouw antwoord:</span> ${answer.answer}</p>
                <p><span>Correct antwoord:</span> ${answer.correctAnswer}</p>
                <p>${answer.isCorrect ? 'Goed gedaan!' : 'Helaas, dit antwoord was niet juist.'}</p>
                <hr>
            `;
        });

        popupContent += `
            <div id='buttons'>
                <a class="restart-game-button">Herstart het spel</a>
                <a class="next-level-button">Ga naar Level 2</a>
            </div>
        `;

        popupContent += `</div>`;
        resultPopup.innerHTML = popupContent;
        document.body.appendChild(resultPopup);

        const nextLevelButton = resultPopup.querySelector('.next-level-button');
        const restartGameButton = resultPopup.querySelector('.restart-game-button');

        nextLevelButton.addEventListener('click', () => {
            console.log(this.renderPlayer)
            this.gameLevel = level
            resultPopup.remove();
            this.loadlevel(this.gameLevel); // Ga naar level 2
        });

        restartGameButton.addEventListener('click', () => {
            window.location.reload(); // Herstart het spel
        });
    }

    showPopup(id, title, message, isAnswerPopup, titleisAnswerPopup, sub1, sub2, sub3, a1, a2, a3, callback) {
        const popup = document.createElement('div');
        popup.className = 'popup-frame';
        popup.id = id;

        let popupContent = `
        <div class="popup-content">
            <h2>${title}</h2>
            <p>${message}</p>
        `;
        
        popupContent += `<button class="close-popup">Start het level</button></div>`;
        popup.innerHTML = popupContent;
        document.body.appendChild(popup);


        const closeButton = popup.querySelector('.close-popup');
        const answerOptions = popup.querySelectorAll('.answer-options a');

        closeButton.addEventListener('click', () => {
            popup.remove();
            this.renderPlayer++
            this.gameLoop()
            if (isAnswerPopup) {
                this.showAnswerPopup(id, titleisAnswerPopup, sub1, sub2, sub3, a1, a2, a3, callback); 
            }
        });

        if (isAnswerPopup) {
            answerOptions.forEach(option => {
                option.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (option.dataset.answer === 'true'){
                        this.result.push(true)
                    } else {
                        this.result.push(false)
                    }
                    console.log('Selected answer:', option.dataset.answer);
                    console.log(this.result) //Test zien wat er in de result list zit
                });
            });
        }
    }

    showAnswerPopup(id, titleisAnswerPopup, sub1, sub2, sub3, a1, a2, a3, callback) {
        const answerPopup = document.createElement('div');
        answerPopup.className = 'popup-frame answer-popup';
        answerPopup.id = id;

        const answerPopupContent = `
            <div class="popup-content">
                <h2>${titleisAnswerPopup}</h2>
                <div class="answer-options">
                    <a href="#" data-answer="${a1}" data-src=${sub1}>1: <img src=${sub1} alt="Answer image"></img></a>
                    <a href="#" data-answer="${a2}" data-src=${sub2}>2: <img src=${sub2} alt="Answer image"></img></a>
                    <a href="#" data-answer="${a3}" data-src=${sub3}>3: <img src=${sub3} alt="Answer image"></img></a>
                </div>
            </div>
        `;

        answerPopup.innerHTML = answerPopupContent;
        document.body.appendChild(answerPopup);

        const answerOptions = answerPopup.querySelectorAll('.answer-options a');
        answerOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                event.preventDefault();
                const isCorrect = option.dataset.answer === 'true';
                const selectedImageSrc = option.dataset.src;
                this.result.push(isCorrect);

                if (isCorrect) {
                    this.opgaveResult.push(`Bij vraag: '${titleisAnswerPopup}' heb je het correct beantwoord`);
                } else {
                    this.opgaveResult.push(`Bij vraag: '${titleisAnswerPopup}' heb je het fout beantwoord`);
                }
                console.log('Selected answer:', isCorrect);
                console.log('Selected image source:', selectedImageSrc);

                this.renderPlayer++;
                this.gameLoop()
                answerPopup.remove();
                callback(selectedImageSrc)
            });
        });
    }

    drawImageOnCanvas(imageSrc, x, y, width, height) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            this.ctx.drawImage(image, x, y, width, height);
        };
    }

    initialiseerBackground() {
        const backgroundImage = new Image()
        backgroundImage.src = './images/background.jpg'

        backgroundImage.onload = () => { // arrow functie voor juiste 'this' aan te spreken!!!
            this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        }

    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
}