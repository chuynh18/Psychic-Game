// strict is how I roll, baby
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
var i = 0 // for the purposes of obnoxious blinking =)

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

// obnoxious blinking:  green
function blinkGreen() {
    for (i = 0; i < 5; i++) {
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#aaffaa";
        }, 200 * i - 100);
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffffff";
        }, 200 * i);
    };
};

// obnoxious blinking:  red
function blinkRed() {
    for (i = 0; i < 5; i++) {
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffaaaa";
        }, 200 * i - 100);
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffffff";
        }, 200 * i);
    };
};

// obnoxious blinking:  yellow
function blinkYellow() {
    for (i = 0; i < 5; i++) {
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffffaa";
        }, 200 * i - 100);
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffffff";
        }, 200 * i);
    };
};

// Initialize the game:  call updateGameScore()
updateGameScore();

// the real meat of the core logic begins beneath here!
// listen for keypresses
document.addEventListener('keypress', function(e) {
    // get the value of the key pressed (as opposed to the id of the key), convert it to lowercase, and store it in guessedLetter var
    guessedLetter = (e.key).toLowerCase();
    console.log("[info] keypress logged: " + guessedLetter);

    // if the player sucessfully guesses the game's chosenLetter, reset # of guesses to 9, increment wins by 1, reset guessedLetters to an empty array
    if (guessedLetter === chosenLetter) {
        guesses = 9;
        wins += 1;
        guessedLetters = [];
        updateGameScore();
        document.getElementById("errorReason").innerHTML = "You <b>won</b>!";
        blinkGreen();
        console.log("[info]: Game reset due to win.");
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
        // message to the player: geez what were you thinking!  guess the LETTER, not the F key or number or something else
        document.getElementById("errorReason").innerHTML = "<b>" + guessedLetter + "</b> is not a letter of the (English) alphabet!";
        blinkYellow();
        console.log("[info]: Player input something other than a letter.")
    }

    // if the player has guessed a previously guessed letter, tell them they already guessed that and don't log it
    else if (guessedLetters.indexOf(guessedLetter) !== -1) {
        // message to the player: how bad is your memory!?  short term memory isn't THAT short
        document.getElementById("errorReason").innerHTML = "You already guessed <b>" + guessedLetter + "</b>!";
        // obnoxious blinking:  yellow
        blinkYellow();
        console.log("[info]: Player guessed a previously-guessed letter.")
    }

    // if the player runs out of guesses, reset # of guesses to 9, increment losses by 1, reset guessedLetters to an empty array
    else if (guesses === 1) {
        guesses = 9;
        losses += 1;
        guessedLetters = [];
        updateGameScore();
        document.getElementById("errorReason").innerHTML = "You <b>lost</b>."
        blinkRed();
        console.log("[info] Game reset due to loss.");
        };

});