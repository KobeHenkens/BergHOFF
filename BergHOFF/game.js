export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.gameState = 'start' // Start || playing 
    }
    startScherm() {
        const startSchermDisplay = document.querySelector('.startScherm')
        const startButton = startSchermDisplay.querySelector('button')

        if (this.gameState === 'start') {
            startSchermDisplay.style.display = "block"
            
            startButton.addEventListener('click', () => {
                startSchermDisplay.style.display = "none"
                this.startGame()
            })
        }
    }
    startGame() {

    }
    render() {

    }


}