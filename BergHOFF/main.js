import { Game } from "./game";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

const game = new Game(canvas, ctx)

// Functie start het spel wanneer de knop is actief


// Render startscherm
game.startScherm()
