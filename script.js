let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d');



window.addEventListener('DOMContentLoaded', (event) => {
  btnProvideQuestion()
  console.log('DOM fully loaded and parsed',);
  matchingElements();
  

});

//timer
class Stopwatch {
  constructor(display, results) {
      this.running = false;
      this.display = display;
      this.results = results;
      this.laps = [];
      this.reset();
      this.print(this.times);
  }
  
  reset() {
      this.times = [ 0, 0, 0 ];
  }
  
  start() {
      if (!this.time) this.time = performance.now();
      if (!this.running) {
          this.running = true;
          requestAnimationFrame(this.step.bind(this));
      }
  }
  
  lap() {
      let times = this.times;
      let li = document.createElement('li');
      li.innerText = this.format(times);
      this.results.appendChild(li);
  }
  
  stop() {
      this.running = false;
      this.time = null;
  }

  restart() {
      if (!this.time) this.time = performance.now();
      if (!this.running) {
          this.running = true;
          requestAnimationFrame(this.step.bind(this));
      }
      this.reset();
  }
  
  clear() {
      clearChildren(this.results);
  }
  
  step(timestamp) {
      if (!this.running) return;
      this.calculate(timestamp);
      this.time = timestamp;
      this.print();
      requestAnimationFrame(this.step.bind(this));
  }
  
  calculate(timestamp) {
      var diff = timestamp - this.time;
      // Hundredths of a second are 100 ms
      this.times[2] += diff / 10;
      // Seconds are 100 hundredths of a second
      if (this.times[2] >= 100) {
          this.times[1] += 1;
          this.times[2] -= 100;
      }
      // Minutes are 60 seconds
      if (this.times[1] >= 60) {
          this.times[0] += 1;
          this.times[1] -= 60;
      }
  }
  
  print() {
      this.display.innerText = this.format(this.times);
  }
  
  format(times) {
      return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
      result = '0' + result;
  return result;
}

function clearChildren(node) {
  while (node.lastChild)
      node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'),
  document.querySelector('.results'));
  //timer end

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
function showDiv() {
  document.getElementById('welcomeDiv').style.display = "block";
}
function hideDiv(){
  document.getElementById('welcomeDiv').style.display = "none";

}

function matchingElements(){
  btnProvideQuestion();
   allTargets()
}

let targetObject = makeSquare(400,canvas.height  - 280,20,6,0)
let targetObject2 = makeSquare(400,canvas.height   - 220,20,6,1)
let targetObject3 = makeSquare(400,canvas.height   - 150,20,6,2)
let targetObject4 = makeSquare(400,canvas.height  - 80,20,6,3)

function allTargets(){
 
return  ar= [targetObject,targetObject2,targetObject3,targetObject4]

}
//images init

let welcome = new Image();
welcome.src = "images/welcome.png";

let keys = new Image();
keys.src = "images/keys2.png";

let endImg = new Image();
endImg.src = "images/gaameOver.png";

let endImg2 = new Image();
endImg2.src = "images/welcome2.png";

let win = new Image();
win.src = "images/win.png";

let win3 = new Image();
win3.src = "images/win3.png";

let win4 = new Image();
win4.src = "images/win4.png";

welcome.addEventListener('load',cb=>{
  context.drawImage(welcome, 0, 0,200,200 );
})

keys.addEventListener('load',cb=>{
  context.drawImage(keys, 110, 290 ,50,50 );

})


let ship = makeSquare(50, canvas.height / 2 - 25, 50, 5);
let up = false;
let down = false;
let space = false;

let shooting = false;

let bullet = makeSquare(0, 0, 10, 10);

let enemies = [];
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
let timeoutId = null;

let bg = new Image();
bg.src = "images/stars6.jpg";



function menu() {
  erase();

// bg.addEventListener('load',(cb)=>{
//   context.drawImage(bg, 0, 0 );

// })

  context.fillStyle = '#000000';
  context.font = '36px Verdana';
  context.textAlign = 'center';
  context.fillText('QUIZZER!', canvas.width / 2, canvas.height / 4);
  context.font = '24px Verdana';
  context.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
  context.font = '14px Verdana';
  context.fillText('To win shoot 10 targets', canvas.width /2  ,canvas.height/2 - 50 );	
  context.font = '14px Verdana';
  context.fillText('Up/Down to move, Space to shoot.', canvas.width / 2, (canvas.height / 4) * 3);
  // Start the game on a click
  
  canvas.addEventListener('click', startGame);
 

}


// Start the game
function startGame() {
  
  draw();
  showDiv();
  stopwatch.start()
 

  // Stop listening for click events
  canvas.removeEventListener('click', startGame);
}

// Show the end game screen
function endGame() {
	// Stop the spawn interval
  clearInterval(timeoutId);
  // Show the final score
  erase();
  hideDiv();
  stopwatch.stop();
 
  
  context.drawImage(endImg, 0, 10,250,200);
  context.drawImage(endImg2, 350, 200,200,250);

  context.fillStyle = '#000000';
  context.font = '24px Verdana';
  context.textAlign = 'center';
  context.fillText('Game Over. Final Score: ' + score, canvas.width / 2, canvas.height / 2);
  
}
//win game screen
function winGame(){
  if(score > 9){
  	// Stop the spawn interval
    clearInterval(timeoutId);
    // Show the final score
    erase();
    hideDiv();
    stopwatch.stop();
   
    
    context.drawImage(win, 0, 10,100,100);
    context.drawImage(win3, 100, 10,100,100);

    context.drawImage(win3, 350, 10,100,100);

    context.drawImage(win4, 450, 10,100,100);
    context.drawImage(endImg2, 350, 200,200,250);
  
    context.fillStyle = '#000000';
    context.font = '30px Verdana';
    context.textAlign = 'center';
    context.fillText('You win.Your Score: ' + score, canvas.width / 2, canvas.height / 2);

}
else{
  endGame() ;
}

  
}


// Listen for keydown eents
document.addEventListener('keydown',(event) => {
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
  context.drawImage(bg, 0, 0 );
  let gameOver = false;
 
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
    let rigthIndex = answers.indexOf(randomQuestion.rightAnswer)
    ar.forEach(function(targetObject, i) {
      if (isColliding(bullet , targetObject)) {
       
        if(targetObject.id == rigthIndex){
          score++;
         btnProvideQuestion();
         
 let targetObject = makeSquare(400,canvas.height / 2 - 150,20,6,0)
let targetObject2 = makeSquare(400,canvas.height / 2 - 100,20,6,1)
let targetObject3 = makeSquare(400,canvas.height / 2 - 50,20,6,2)
let targetObject4 = makeSquare(400,canvas.height / 2 - 0,20,6,3)

         


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
      
        else{
     
          gameOver = true;

        }

        // ar.splice(i, 1);
      }
    });
     

    // Collide with the wall
    if (bullet.x > canvas.width) {
      shooting = false;
    }
    // Draw the bullet
    context.fillStyle = '#0000FF';
    bullet.draw();
  }
  // Draw the score
  context.fillStyle = '#FFFFFF';
  context.font = '25px Sans';
  context.textAlign = 'left';
  context.fillText('Score: ' + score, 1, 25)
  // End or continue the game
  if (gameOver) {
    winGame()
    // endGame();
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
quiz[0] = new Question("What does “ === “ operator do ?", "checks type & value", "checks type only", "checks value only","Out of bound");
quiz[1] = new Question("Is javascript a statically or dynamically typed language?", "dynamically", "statically", "both","IDK");
quiz[2] = new Question("What is NaN property in JavaScript?", "not a number", "not a nuisance", "not a narcotic","not a not");
quiz[3] = new Question("What is a prototype ?", "Is a blueprint of an object", "Is not blueprint of an object", "Is blackprint of an object","none");
quiz[4] = new Question("What is the use of CF?", "Used to create objects", "Used to shoot objects", "Used to increase difficulty","Idk");
quiz[5] = new Question("DOM stands for?", "Document Object Model", "Document Original Moral", "Document Of Mortals","Dude of Maggie");
quiz[6] = new Question("What are classes in javascript??", "Syntactic sugar for CF", "Sugar Yes pls", "Root cause for complication","none");
quiz[7] = new Question("What is the use of Promises?", "To handle Async", "To handle Sync", "To handle Sink","To handle lie");
quiz[8] = new Question("What is map used for ?", "To store key value pairs", "To store coordinates", "Used for navigation","Used for routes");
quiz[9] = new Question("What is Object Destructuring?", "new way to extract elements from an object or an array", "i dont know", "1st option","no");
quiz[10] = new Question("TDZ ?", "Temporal dead zone", "Temporal dead zombie", "To dead zone","Temporal diet zone");
quiz[11] = new Question("console.log('1'+1);?", "11", "'11'", "2","undefined");
quiz[12] = new Question("console.log('Hello'+'8')?", "Hello8", "'Hello8'", "NaN","undefined");
quiz[13] = new Question("What is js ?", "programming language", "scripting language", "Elder bro of Java","Java sister");
quiz[14] = new Question("Is JavaScript a case-sensitive language? ?", "Yes", "No", "Maybe","CamelCase");
quiz[15] = new Question("One built in method ?", "indexOf()", "notAnumber()", "string()","case()");


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
return answers
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
}

function checkAnswer(answer) {  
  if (answer == randomQuestion.rightAnswer) {
    adjustScore(true);
    btnProvideQuestion();
  } else { 
    alert("Loser!");
    adjustScore(false);
  }	  
}
