### Quizzerr
## Description
Quizzer is a game where the player has to read the question on the screen and shoot the right target. Player can move shooting object horizontally and shoot up bombs/targets that appear on top of the screen. The game ends when the player chooses the wrong option for the question.After that, a score is calculated based on correct target destroyed.


## MVP (DOM - CANVAS)
MVP definition, deliverables.
- game has a question on the right side of screen with four choices.
- player should read the question and answer by shooting the right target.
- canvas has four bombs/targets that on top of screen.
- cake shoots cannonballs upward direction
- bombs are on top of the screen
- one wrong answer ends the game
- cannonballs destroy bomb



## Backlog


-TARGETS FOR SHOOTING.(MULTIPLE & MOVABLE)
-TIMER TO CHOOSE THE CORRECT OPTION OR GAME ENDS
-DARK THEME AND LIGHT THEME.


## Data structure
Classes and methods definition.
# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js

- Game () {}
- starLoop () {}
- addBomb () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# cake.js 

- Cake () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- shoot () {}
- checkScreenCollision () {}

# bomb.js 

- bomb () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}


# cannonball.js 

- Cannonball () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}




## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen


## Task
Task definition in order of priority
- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- bomb/target - draw
- bomb/target - move
- game - addBomb
- cake - draw
- cake - move
- cake - shoot
- game - addCake
- cannonball - draw
- cannonball - move
- game - checkCollision
- game - GameOver
- game - addEventListener

## Links


### Trello
[Link url] https://trello.com/b/SDa7fsh7/iron


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)

wireframes
https://balsamiq.cloud/sol1p9b/p6kgfri
