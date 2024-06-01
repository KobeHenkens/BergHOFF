import { Game } from "./game";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

const game = new Game(canvas, ctx)
// Funcite start het spel wanneer alle fotos zijn ingeladen
// Nog niet maken...



// Render het spel
game.render()
