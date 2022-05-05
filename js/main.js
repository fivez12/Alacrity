window.addEventListener('load',init);
//Globbls

//Available levels
let levels = {
    easy:30,
    medium:20,
    hard:10
}

//To change level
let currentLevel = levels.easy;

let tiime = levels.easy;
let sccore = 0;
let issPlaying;


// DOM Elements
const wordInput = document.querySelector('#word-input');
const cuurrentWord = document.querySelector('#cuurrent-word');
const sccoreDisplay = document.querySelector('#sccore');
const tiimeDisplay = document.querySelector('#tiime');
const meessage = document.querySelector('#meessage');
const seeconds = document.querySelector('#seeconds');
const hiighscoreDisplay = document.querySelector('#hiighscore');
const stopBtn = document.querySelector('#stop');
const resumeBtn = document.querySelector('#resume');
const resetBtn = document.querySelector('#reset');
const highscoreDisplay = document.querySelector('#highscore');



//Innitialize Game
function init() {
    //Show number of seconds in UI
    seeconds.innerHTML = currentLevel;
   //Looad word from array
//   showWord(woords);
   // Start matching on word input
   wordInput.addEventListener('input',startMatch);
   // Call countdown every second
   timeCountdown = setInterval(countdown, 1000);
   // Check game status
   setInterval(checkStatus,50);
   
}

//Set difficulty
//Easy
const sEasy = document.getElementById('easy').addEventListener("click",(e) => {
    currentLevel = levels.easy;
    seeconds.innerHTML = currentLevel;
    tiime = currentLevel;
    rendernewQuote()
    wordInput.value = '';
    sccoreDisplay.innerHTML = 0;
})
//Medium
const sMedium = document.getElementById('medium').addEventListener("click",(e) => {
    currentLevel = levels.medium;
    seeconds.innerHTML = currentLevel;
    tiime = currentLevel;
    rendernewQuote()
    wordInput.value = '';
    sccoreDisplay.innerHTML = 0;
})
//Hard
const sHard = document.getElementById('hard').addEventListener("click",(e) => {
    currentLevel = levels.hard;
    seeconds.innerHTML = currentLevel;
    tiime = currentLevel;
    rendernewQuote()
    wordInput.value = '';
    sccoreDisplay.innerHTML = 0;
})

//Stop button

stopBtn.addEventListener('click',stop)


function stop () {
    issPlaying = false;
    clearInterval(timeCountdown);
    wordInput.disabled = true;
    resumeBtn.disabled = false;
}

// //Resume Button
resumeBtn.addEventListener('click',resume)

function resume() {
    issPlaying = true;
    timeCountdown = setInterval(countdown, 1000);
    console.log(issPlaying);
    wordInput.disabled = false;
    resumeBtn.disabled = true;
}

// //Reset Button
resetBtn.addEventListener('click', reset)

function reset() {
    rendernewQuote()
    wordInput.value = '';
    seeconds.innerHTML = currentLevel;
    tiime = currentLevel;
    sccore = - 1;
    sccoreDisplay.innerHTML = 0;
    resumeBtn.disabled = true;
    meessage.innerHTML = null;

}


//Event listener for text color
let correct = true;
wordInput.addEventListener('input',() => {
const ArrayQuote =  cuurrentWord.querySelectorAll('span')
const ArrayValue =  wordInput.value.split('')
ArrayQuote.forEach((charSpan,index) => {
    const character = ArrayValue[index]
     if(character === null) {
        charSpan.classList.remove('correct');
        charSpan.classList.remove('incorrect');
        correct = false;
    } else if(character === charSpan.innerText) {
        charSpan.classList.add('correct');
        charSpan.classList.remove('incorrect');
    } else {
        charSpan.classList.remove('correct');
        charSpan.classList.add('incorrect');
        correct = false;
    }
})
// if (correct) rendernewQuote();
})

//Generate random quote
const randomQuote = 'https://api.quotable.io/random';

function getrandomQuote() {
return fetch(randomQuote)
.then(response => response.json())
.then(data => data.content)
}

 async function rendernewQuote() {
 const quote = await getrandomQuote()
 cuurrentWord.innerHTML = '';
 quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char;
    cuurrentWord.appendChild(charSpan);
 })
 wordInput.value = null
}

rendernewQuote()

//Start match
function startMatch() {
    // IF STOPPED STOP MATCH
    if (issPlaying = false) {
        return
    } else {
    if(matchWords()) {
      issPlaying = true;
      tiime = currentLevel + 1;
      wordInput.value = '';
      sccore++;
      rendernewQuote();
    }
    // If score is -1,display 0
    if(sccore === -1) {
    sccoreDisplay.innerHTML = 0;
    } else {
    sccoreDisplay.innerHTML = sccore;
    }
    }
}

 // Highscore based on score value for Session Storage
 if (typeof sessionStorage['highscore'] === 'undefined' || sccore > sessionStorage['highscore']) {
    sessionStorage['highscore'] = sccore;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }
 

//Match currentword to word input
function matchWords() {
    if(wordInput.value === cuurrentWord.textContent) {
        meessage.innerHTML = 'Correct!!!';
        console.log(sccore);
        return true;
    }
     else {
        meessage.innerHTML = 'Wrong';
        return false;
    }
     
}

//Countdown timer
function countdown() {
    // Makesure time is not run out
    if(tiime > 0){
    tiime--;
    } else if (tiime === 0) {
    issPlaying = false;
    }
    // Show time
    tiimeDisplay.innerHTML = tiime;
}

//Check game status
function checkStatus() {
    if(!issPlaying && tiime === 0){
        meessage.innerHTML = 'Game is over!';
        sccore = - 1;
        sccoreDisplay.innerHTML = 0;
    }
}




