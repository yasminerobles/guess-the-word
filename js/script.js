const guessedLetterElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");



const word = "Magnolia";
const guessedLetters = [];

const filler = function (word) {
    const fillerLetters = [];
  for (const letter of word) {
    console.log(letter);
    fillerLetters.push("●");
  }
  wordInProgress.innerText = fillerLetters.join("");
};

filler(word);


guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = input.value;
    const rightGuess = validation (guess);

});

const validation = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input===0){
        message.innerText = "Please enter a letter.";
    } else if (input.length>1) {
        message.innerText = "Please enter one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Only letters from A to Z";
    } else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
