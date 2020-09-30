let canvas = document.querySelector('canvas')
canvas.style.border = '1px solid black';
let context = canvas.getContext('2d');

window.addEventListener('DOMContentLoaded', (event) => {
  btnProvideQuestion()
  console.log('DOM fully loaded and parsed',);
  matchingElements();

});
// Create an object representing a square on the canvas
function makeSquare(x, y, length, speed ,id ,bool) {
  return {
    x: x,
    y: y,
    l: length,
    s: speed,
    id:id,
    bool:true,
    draw: function() {
      context.fillRect(this.x, this.y, this.l, this.l);
    }
  };
}


// The ship the user controls
// shooter
function matchingElements(){
  btnProvideQuestion();
  // answer = allTargets()
allTargets()
  console.log('im from match',ar)
  
  console.log('im from match',answers,randomQuestion)
  
}

let targetObject = makeSquare(400,canvas.height / 2 - 150,20,6,0)
let targetObject2 = makeSquare(400,canvas.height / 2 - 100,20,6,1)
let targetObject3 = makeSquare(400,canvas.height / 2 - 50,20,6,2)
let targetObject4 = makeSquare(400,canvas.height / 2 - 0,20,6,3)

function allTargets(){
 
return  ar= [targetObject,targetObject2,targetObject3,targetObject4]

}

// function createTarget(){
//   for(i=0;i<5;i++){
//     makeSquare
//   }
// } 

let ship = makeSquare(50, canvas.height / 2 - 25, 50, 5);

// Flags to tracked which keys are pressed
let up = false;
let down = false;
let space = false;

// Is a bullet already on the canvas?
let shooting = false;
// The bulled shot from the ship
// bullet
let bullet = makeSquare(0, 0, 10, 10);

// An array for enemies (in case there are more than one)
let enemies = [];
//my target objest here


// Add an enemy object to the array
// enemy here
// start
// let enemyBaseSpeed = 2;
// function makeEnemy() {
  
//   let enemyX = canvas.width;
//   let enemySize = Math.round((Math.random() * 15)) + 15;
//   let enemyY = Math.round(Math.random() * (canvas.height - enemySize * 2)) + enemySize;
//   let enemySpeed = Math.round(Math.random() * enemyBaseSpeed) + enemyBaseSpeed;
//   enemies.push(makeSquare(enemyX, enemyY, enemySize, enemySpeed));
// }
// end


// Check if number a is in the range b to c (exclusive)
function isWithin(a, b, c) {
  return (a > b && a < c);
}

// Return true if two squares a and b are colliding, false otherwise
function isColliding(a, b) {
  let result = false;
  if (isWithin(a.x, b.x, b.x + b.l) || isWithin(a.x + a.l, b.x, b.x + b.l)) {
    if (isWithin(a.y, b.y, b.y + b.l) || isWithin(a.y + a.l, b.y, b.y + b.l)) {
      result = true;
    }
  }
  return result;
}

// Track the user's score
let score = 0;
// The delay between enemies (in milliseconds)
// let timeBetweenEnemies = 5 * 1000;
// ID to track the spawn timeout
let timeoutId = null;

// Show the game menu and instructions
function menu() {
  erase();
  context.fillStyle = '#000000';
  context.font = '36px Arial';
  context.textAlign = 'center';
  context.fillText('Shoot !', canvas.width / 2, canvas.height / 4);
  context.font = '24px Arial';
  context.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
  context.font = '18px Arial';
  context.fillText('Up/Down to move, Space to shoot.', canvas.width / 2, (canvas.height / 4) * 3);
  // Start the game on a click
  canvas.addEventListener('click', startGame);
}

// Start the game
function startGame() {
	// Kick off the enemy spawn interval
//just START timeoutId = setInterval(makeEnemy, timeBetweenEnemies);
  // Make the first enemy
 //just START  setTimeout(makeEnemy, 1000);
  // Kick off the draw loop
  
//   greenTarget();
  draw();
 
  // Stop listening for click events
  canvas.removeEventListener('click', startGame);
}

// Show the end game screen
function endGame() {
	// Stop the spawn interval
  clearInterval(timeoutId);
  // Show the final score
  erase();
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'center';
  context.fillText('Game Over. Final Score: ' + score, canvas.width / 2, canvas.height / 2);
}

// Listen for keydown events
console.log('hi')
document.addEventListener('keydown',(event) => {
    console.log(event)
    event.preventDefault();
  if (event.keyCode === 38 || event.key == 'ArrowUp' ) { // UP
    up = true;
  }
  if (event.keyCode === 40|| event.key == 'ArrowDown') { // DOWN
    down = true;
  }
  if (event.keyCode === 32 || event.key == 'Space') { // SPACE
    shoot();
  }
});

// Listen for keyup events
document.addEventListener('keyup', (event) => {
  
  event.preventDefault();
  if (event.keyCode === 38 || event.key == 'ArrowUp') { // UP 
    up = false;
  }
  if (event.keyCode === 40  || event.key == 'ArrowDown') { // DOWN
    down = false;
  }
});

// Clear the canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, 600, 400);
}

// Shoot the bullet (if not already on screen)
function shoot() {
  if (!shooting) {
    shooting = true;
    bullet.x = ship.x + ship.l;
    bullet.y = ship.y + ship.l / 2;
  }
}


// The main draw loop
function draw() {
  erase();
  let gameOver = false;
  // Move and draw the enemies
  // start 
  // enemies.forEach(function(enemy) {
  //   enemy.x -= enemy.s;
  //   if (enemy.x < 0) {
  //     gameOver = true;
  //   }
  //   context.fillStyle = '#00FF00';
  //   enemy.draw();
  // });
  // ennd
  // Collide the ship with enemies
//start
  // ar.forEach(function(targetObject, i) {
  //   if (isColliding(targetObject, bullet)) {
  //     gameOver = true;
  //   }
  // });
  //end
  // Move the ship
  if (down) {
    ship.y += ship.s;
  }
  if (up) {
    ship.y -= ship.s;
  }
  // Don't go out of bounds
  if (ship.y < 0) {
    ship.y = 0;
  }
  if (ship.y > canvas.height - ship.l) {
    ship.y = canvas.height - ship.l;
  }
  // Draw the ship
  context.fillStyle = '#FF0000';
  ship.draw();

    // draw targetObject
  context.fillStyle = '#005bed';
  targetObject.draw();
  context.fillStyle = '#0cf0d5';
  targetObject2.draw();
  context.fillStyle = '#f0d90e';
  targetObject3.draw();
  context.fillStyle = '#f00edd';
  targetObject4.draw();
  

  // Move and draw the bullet
  if (shooting) {
    // Move the bullet
    bullet.x += bullet.s;
    // Collide the bullet with enemies
allTargets()
    // ar= [targetObject,targetObject2,targetObject3,targetObject4]
//just START

    // ar.forEach(function(targetObject, i) {
    //   if (isColliding(bullet, targetObject)) {
    //     ar.splice(i, 1);
    //     score++;
    //     console.log(targetObject)
    //     targetObject.x = 0 
    //     targetObject.y = 0 
    //     targetObject.s = 0 
    //     targetObject.l = 0 
    //     shooting = false;
    //   }
    // });
    let rigthIndex = answers.indexOf(randomQuestion.rightAnswer)
    // console.log("r", rigthIndex) 
    ar.forEach(function(targetObject, i) {
      if (isColliding(bullet , targetObject)) {
        // if check that target object is answer{ return score ++}
        // else gameOver
        // targetObject.id = 'true'
        if(targetObject.id == rigthIndex){
          score++;
         btnProvideQuestion();
         
         let targetObject = makeSquare(400,canvas.height / 2 - 150,20,6,0)
let targetObject2 = makeSquare(400,canvas.height / 2 - 100,20,6,1)
let targetObject3 = makeSquare(400,canvas.height / 2 - 50,20,6,2)
let targetObject4 = makeSquare(400,canvas.height / 2 - 0,20,6,3)

         


          console.log('hi im at',targetObject)
          targetObject.x = 0 
          targetObject.y = 0 
          targetObject.s = 0 
          targetObject.l = 0 

        
          targetObject.bool =false
          targetObject2.bool=false;
          targetObject4.bool = false
          targetObject3.bool = false

       
          shooting = false;
        }
        // if(targetObject.bool === true){
        //   // ar.splice(i, 1);
        //   score++;
        //   console.log('hi im at',targetObject)
        //   targetObject.x = 0 
        //   targetObject.y = 0 
        //   targetObject.s = 0 
        //   targetObject.l = 0 

        
        //   targetObject.bool =false
        //   targetObject2.bool=false;
        //   targetObject4.bool = false
        //   targetObject3.bool = false

       
        //   shooting = false;
        // }
        else{
          console.log('hi im at',targetObject)
          gameOver = true;

        }

        // ar.splice(i, 1);
      }
    });
    //for loop 
  

    //     // Make the game harder
    //     if (score % 10 === 0 && timeBetweenEnemies > 1000) {
    //       clearInterval(timeoutId);
    //       timeBetweenEnemies -= 1000;
    //       timeoutId = setInterval(makeEnemy, timeBetweenEnemies);
    //     } else if (score % 5 === 0) {
    //       enemyBaseSpeed += 1;
    //     }
     
  // for(i=0;i<ar.length;i++){
  //     if(ar[i]=== a[]) {

  //     }
  //   }
 //just end   

    // Collide with the wall
    if (bullet.x > canvas.width) {
      shooting = false;
    }
    // Draw the bullet
    context.fillStyle = '#0000FF';
    bullet.draw();
  }
  // Draw the score
  context.fillStyle = '#000000';
  context.font = '22px Sans';
  context.textAlign = 'left';
  context.fillText('Score: ' + score, 1, 25)
  // End or continue the game
  if (gameOver) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}

// Start the game
menu();
canvas.focus();


// quiz js
//variables
var quiz = [];
quiz[0] = new Question("What is 1 + 4 ?", "5", "24", "23","3");
quiz[1] = new Question("What color of tomato?", "Red", "White", "Green","Yellow");
quiz[2] = new Question("how many months in a year?", "12", "10", "9" ,"2");
quiz[3] = new Question("How many legs does a spider have?", "8", "6", "4","3");
quiz[4] = new Question("Best footballe player?", "Messi", "Ronaldo", "Saurez","Neymar");
quiz[5] = new Question("What is 2-2?", "0", "2", "4","1");
quiz[6] = new Question("Who is the best author ?", "Dale", "Baker", "Peter","ran");


var randomQuestion;
var answers = [];
var currentScore = 0;

document.addEventListener("DOMContentLoaded", function(event) { 
  btnProvideQuestion();
});

function Question(question,rightAnswer,wrongAnswer1,wrongAnswer2,wrongAnswer3) {
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
    this.wrongAnswer3 = wrongAnswer3
 
};


function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function btnProvideQuestion() { 
  
	var randomNumber = Math.floor(Math.random()*quiz.length);
	randomQuestion = quiz[randomNumber]; //getQuestion
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2 , randomQuestion.wrongAnswer3];
  shuffle(answers);
  
  document.getElementById("question").innerHTML= randomQuestion.question;
  document.getElementById("answerA").value= answers[0];
  document.getElementById("answerA").innerHTML= answers[0];
  document.getElementById("answerB").value= answers[1];
  document.getElementById("answerB").innerHTML= answers[1];
  document.getElementById("answerC").value= answers[2];
  document.getElementById("answerC").innerHTML= answers[2];
  document.getElementById("answerD").value= answers[3];
  document.getElementById("answerD").innerHTML= answers[3];
// console.log('im ans',answers, randomQuestion.rightAnswer)
return answers
// console.log('im 2',answers)

}


function answerA_clicked() {
  var answerA = document.getElementById("answerA").value;
  	checkAnswer(answerA);
}

function answerB_clicked() {
		var answerB = document.getElementById("answerB").value;
  checkAnswer(answerB);
}
function answerC_clicked() {
  var answerC = document.getElementById("answerC").value;
  	
		checkAnswer(answerC);
}
function answerD_clicked() {
  var answerD = document.getElementById("answerD").value;
  	
		checkAnswer(answerD);
}

function adjustScore(isCorrect) {
  debugger;
  if (isCorrect) {
    currentScore++;
  } else {
    if (currentScore > 0) {
      currentScore--;
  	}
  }
  // document.getElementById("score").innerHTML = currentScore;
}

function checkAnswer(answer) {  
  if (answer == randomQuestion.rightAnswer) {
    // console.log('im rit',randomQuestion.rightAnswer)

    adjustScore(true);
    btnProvideQuestion();
  } else { 
    alert("Loser!");
    adjustScore(false);
  }	  
}

