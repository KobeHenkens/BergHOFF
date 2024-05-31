import { Application, Assets, AnimatedSprite } from 'pixi.js';
       
// DOCS BRON: https://pixijs.com/8.x/guides/basics/getting-started#loading-pixijs
export const loadAnimation = async function(frames) {
    const app = new Application()

    await app.init({width: 824, height: 630,transparent: true})

    document.body.appendChild(app.canvas)
    
      // Load all frames using the Assets API
      const textures = await Promise.all(frames.map(frame => Assets.load(frame)));

        // Create an AnimatedSprite
        const animatedSprite = new AnimatedSprite(textures);
        animatedSprite.animationSpeed = 0.4; // Adjust the animation speed as needed
        animatedSprite.play();

        // Add the animated sprite to the stage
        app.stage.addChild(animatedSprite);

}

