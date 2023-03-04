const guessedLetterElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");

let word = "Magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    filler(word);
};
getWord();

const filler = function (word) {
    const fillerLetters = [];
  for (const letter of word) {
    console.log(letter);
    fillerLetters.push("●");
  }
  wordInProgress.innerText = fillerLetters.join("");
};


guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = input.value;
    const rightGuess = validation (guess);
    if (rightGuess){
        makeGuess(guess);
    
    }
    input.value = "";
});

const validation = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length===0){
        message.innerText = "Please enter a letter.";
    } else if (input.length>1) {
        message.innerText = "Please enter one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Only letters from A to Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Take another guess.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        acceptedGuess(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLetterElement.innerHTML = "";
    for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLetterElement.append(li);
    }
  };

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());

        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const acceptedGuess = function (guess) {
    const upperWord = word.toUpperCase ();
    if (!upperWord.includes(guess)) {
        message.innerText = `The word doesn't contain ${guess}.`;
        remainingGuesses -= 1; 
    } else {
        message.innerText = `Great job! The word does contain ${guess}!`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `No more guesses! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} chance`;

    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkIfWin = function () {
    if (word.toUpperCase()=== wordInProgress.innerText) {
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        
        
        startOver();
    }

};

const startOver = function () {
    remainingGuessesElement.classList.add("hide");
    guessedLetterElement.classList.add("hide");
    guessButton.classList.add("hide");
    againButton.classList.remove("hide");
};

againButton.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLetterElement.innerHTML="";
    message.innerText = "";
    getWord();
    guessButton.classList.remove ("hide");
    againButton.classList.add ("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLetterElement.classList.remove("hide");
});


