import { Application, Assets, AnimatedSprite, Container } from 'pixi.js';
       
    let app;


// DOCS BRON: https://pixijs.com/8.x/guides/basics/getting-started#loading-pixijs
export const loadAnimation = async function(frames, x, y, animationSpeed) {

    if (!app) {
      app = new Application()

      await app.init({
          width: 1920, 
          height: 1080, 
          backgroundAlpha: 0,   
          autoDensity: true,
          //resizeTo: window,
  
      })
      document.body.appendChild(app.canvas)
    }


    

      // Alle afbeeldingen worden ingeladen
      const textures = await Promise.all(frames.map(frame => Assets.load(frame)));

        // Animatie wordt gemaakt
        const animatedSprite = new AnimatedSprite(textures);
        animatedSprite.animationSpeed = animationSpeed; // Animatie snelheid
        animatedSprite.play();  
        
        animatedSprite.x = x // Positie x-as
        animatedSprite.y = y // Positie y-as
        
        
        app.stage.addChild(animatedSprite)
        
        return animatedSprite;

}

// Function to clear the canvas
export const clearCanvas = function() {
  app.stage.removeChildren(); // Removes all children from the stage
};

