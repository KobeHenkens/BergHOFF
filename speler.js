import { loadAnimation } from "./loadanimation"

export class Speler {
    constructor(game) {
        this.game = game
    }
    idle(x, y) {
        const frames = [ './images/chef/keyframes/__black_hair_chef_idle_000.png',]
        const animationSpeed = 0.3

        while (frames.length < 20) {
            const laatsteFrame = frames[frames.length - 1]; 
            const splitsing = laatsteFrame.split('_'); 
            const lastPart = splitsing.find(part => part.endsWith('.png'));
        
            const index = splitsing.indexOf(lastPart);
        
            
            const numberPart = lastPart.replace(/(\d+)/g, match => {
                const number = parseInt(match) + 1; 
                return number.toString().padStart(match.length, '0'); 
            });
        
            splitsing[index] = numberPart;
        
            frames.push(splitsing.join('_'));
        }

        loadAnimation(frames, x, y, animationSpeed)
    }
    walk(x, y) {
        const frames = [ './images/chef/keyframes/__black_hair_chef_walk_000.png',]
        const animationSpeed = 0.2
        while (frames.length < 8) {
            const laatsteFrame = frames[frames.length - 1]; 
            const splitsing = laatsteFrame.split('_'); 
            const lastPart = splitsing.find(part => part.endsWith('.png'));
        
            const index = splitsing.indexOf(lastPart);
        
            
            const numberPart = lastPart.replace(/(\d+)/g, match => {
                const number = parseInt(match) + 1; 
                return number.toString().padStart(match.length, '0'); 
            });
        
            splitsing[index] = numberPart;
        
            frames.push(splitsing.join('_'));
        }

        loadAnimation(frames, x, y, animationSpeed)
    }
    
}