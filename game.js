import { Speler } from "./speler"

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.gameState = 'start' // start || playing 
        this.speler = new Speler(this)
        this.gameLevel = 1
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
        this.gameLoop() // Start de gameloop
    
    }
    gameLoop() {

        if (this.gameState === 'playing') { 
            this.update()
            this.render()
            //requestAnimationFrame(() => this.gameLoop()) // herhaalt de gameloop tot wanneer het spel gestopt is
        }
    }
    update() {
        // Check of level is gecomplete
    }
    render() { 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // Wis alles op de canvas

        this.initialiseerBackground() // Teken de achtergrond op de canvas

        if (this.gameState === 'start') {
            // Render het startscherm 
            this.startScherm()

        } else if (this.gameState === 'playing' ) {
            this.speler.idle(200, 450) // test remove!

            // TODO: Render de score, etcetc
        }
    }
    loadlevel() {

    }
    checkLevelCompletion() {
        
    }

    initialiseerBackground() {
        // Background canvas
        const canvasBackground = document.createElement('canvas')
        const ctxBackground = canvasBackground.getContext('2d')
        canvasBackground.width = this.canvas.width
        canvasBackground.height = this.canvas.height

        const backgroundImage = new Image()
        backgroundImage.src = './images/background.jpg'

        backgroundImage.onload = () => { // arrow functie voor juiste 'this' aan te spreken!!!
            ctxBackground.drawImage(backgroundImage, 0, 0, canvasBackground.width, canvasBackground.height)
            this.ctx.drawImage(canvasBackground, 0, 0)
        }
        /* Chef op startscherm OPTIE 
        const chef = new Image()
        chef.src = './images/chef.png'
        chef.onload = () => {
            this.ctx.drawImage(chef, 0, 0, chef.width * 2, chef.height *2)
        }*/
    }
}