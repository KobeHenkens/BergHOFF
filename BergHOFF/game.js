import { Speler } from "./speler"

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.gameState = 'start' // start || playing 
        this.speler = new Speler(this)
        this.initialiseerBackground()
    }


    initialiseerBackground() {
        // Background canvas
        const canvasBackground = document.createElement('canvas')
        const ctxBackground = canvasBackground.getContext('2d')
        canvasBackground.width = this.canvas.width
        canvasBackground.height = this.canvas.height

        const backgroundImage = new Image()
        backgroundImage.src = './images/background.jpg'

        backgroundImage.onload = () => { // arrow functie voor juiste this aan te spreken!!!
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

        if (this.gameState === 'playing') { // dubbele check dat game aan het spelen is en niet geeindigd is
            this.speler.idle(100, 100) // test remove!

        }
    }
    render() {
    }
    update() {

    }


}