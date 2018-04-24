"use strict";
// HTML id names listed below for my own convenience

// numWins = id of span to show number of wins player has in the current session
// numLosses = id of span to show number of losses player has in the current session
// numGuessesLeft = id of span to show number of guesses the player has left in the current round
// playerGuesses = id of span to show the guesses the player has made in the current round
// errorReason = id of paragraph to let player what they did wrong

// creating the variables the game will use
var chosenLetter = ""; // letter the game will randomly choose
var guesses = 9; // number of guesses the player has per round
var wins = 0; // how many times the player has won
var losses = 0; // how many times the player has lost
var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // array containing what this game considers to be valid letters
var guessedLetters = []; // array that stores the player's guesses
var guessedLetter = ""; // variable that stores the player's last guess
// ------------------------

// functions the game will use:

// updates the game win/loss count, # of guesses, player's guessed letters, and chooses a new letter - used on game start, win, and loss
function updateGameScore() {
    document.getElementById("numGuessesLeft").innerHTML = guesses;
    document.getElementById("numWins").innerHTML = wins;
    document.getElementById("numLosses").innerHTML = losses;
    document.getElementById("playerGuesses").innerHTML = guessedLetters;
    // Initialize the game:  write code to randomly select a letter
    chosenLetter = lettersArray[Math.floor(Math.random(1) * lettersArray.length)];
    console.log("[info]: the game chose the letter " + chosenLetter);
};

// updates the number of guesses remaining and the guessed letters - will be called after each player guess
function updateGameState() {
    document.getElementById("numGuessesLeft").innerHTML = guesses;
    document.getElementById("playerGuesses").innerHTML = guessedLetters;
};

// Initialize the game:  call updateGameScore()
updateGameScore();
// ------------------------

// listen to keypress, convert it to lowercase, check it for validity, store it into guessedLetters array if valid

// listen for keypresses
document.addEventListener('keypress', function(e) {
    // get the value of the key pressed and convert it to lower case
    guessedLetter = (e.key).toLowerCase();
    console.log("[info] keypress logged: " + guessedLetter);

    // if the player sucessfully guesses the game's chosenLetter, reset # of guesses to 9, increment wins by 1, reset guessedLetters to an empty array
    if (guessedLetter === chosenLetter) {
        guesses = 9;
        wins += 1;
        guessedLetters = [];
        updateGameScore();
        document.getElementById("errorReason").innerHTML = "You <b>won</b>!";
        console.log("[info]: Game reset due to win.")
        }

    // if the player runs out of guesses, reset # of guesses to 9, increment losses by 1, reset guessedLetters to an empty array
    else if (guesses === 1) {
        guesses = 9;
        losses += 1;
        guessedLetters = [];
        updateGameScore();
        document.getElementById("errorReason").innerHTML = "You <b>lost</b>."
        console.log("[info] Game reset due to loss.")
        }

    // if the player's guess is a letter of the alphabet (contained in lettersArray) AND hasn't already been guessed, accept it and decrement guesses by 1
    else if (lettersArray.indexOf(guessedLetter) !== -1 && guessedLetters.indexOf(guessedLetter) === -1) {
        guessedLetters.push(guessedLetter);
        guesses -= 1;
        document.getElementById("errorReason").innerHTML = "";
        updateGameState();
    }

    // if the player's guess isn't contained in lettersArray, tell them their guess isn't a letter and don't log it
    else if (lettersArray.indexOf(guessedLetter) === -1) {
        document.getElementById("errorReason").innerHTML = "<b>" + guessedLetter + "</b> is not a letter of the alphabet!";
    }

    // if the player has guessed a previously guessed letter, tell them they already guessed that and don't log it
    else if (guessedLetters.indexOf(guessedLetter) !== -1) {
        document.getElementById("errorReason").innerHTML = "You already guessed <b>" + guessedLetter + "</b>!";
    };
});