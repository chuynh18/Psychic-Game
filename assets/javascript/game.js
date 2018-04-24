// strict is how I roll, baby
"use strict";

// HTML id names listed below for my own convenience

    // numWins = id of span to show number of wins player has in the current session
    // numLosses = id of span to show number of losses player has in the current session
    // numGuessesLeft = id of span to show number of guesses the player has left in the current round
    // playerGuesses = id of span to show the guesses the player has made in the current round
    // errorReason = id of paragraph to let player know what they did wrong

// creating the variables the game will use
// HEADS UP:  changing these values won't change the behavior of the game.  Look at the functions below!
var chosenLetter = ""; // letter the game will randomly choose
var guesses = 0; // number of guesses the player has per round
var wins = 0; // how many times the player has won
var losses = 0; // how many times the player has lost
var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // array containing what this game considers to be valid letters
var guessedLetters = []; // array that stores the player's guesses
var guessedLetter = ""; // variable that stores the player's last guess

// functions the game will use listed below

    // Starts and restarts the game.
    // refreshes the scoreboard with new values for guesses made, # guesses remaining, wins/losses
    // chooses a new random letter of the alphabet
function beginNewRound() {
    guesses = 9;
    guessedLetters = [];
    document.getElementById("numGuessesLeft").innerHTML = guesses;
    document.getElementById("numWins").innerHTML = wins;
    document.getElementById("numLosses").innerHTML = losses;
    document.getElementById("playerGuesses").innerHTML = guessedLetters;
    // Initialize the game:  write code to randomly select a letter
    chosenLetter = lettersArray[Math.floor(Math.random(1) * lettersArray.length)];
    console.log("[NEW GAME]: the game chose the letter " + chosenLetter);
};

    // updates the number of guesses remaining and the guessed letters - will be called after each player guess
function updateGuesses() {
    document.getElementById("numGuessesLeft").innerHTML = guesses;
    document.getElementById("playerGuesses").innerHTML = guessedLetters;
};

    // obnoxious blinking
        // the colors I'll be using
var green = "#aaffaa";
var yellow = "#ffffaa";
var red = "#ffaaaa";
var gray= "#cccccc";
        // the blink function itself
function blink(color, reps) {
    for (var i = 0; i < reps+1; i++) {
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = color;
        }, 200 * i - 100);
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffffff";
        }, 200 * i);
    };
};

// Initialize the game:  call beginNewRound() - only happens once per page load
beginNewRound();

// the real meat of the core logic begins beneath here!
    // listen for keypresses
document.onkeyup = function(e) {
    // get the value of the key pressed (as opposed to the id of the key), convert it to lowercase, and store it in guessedLetter var
    guessedLetter = (e.key).toLowerCase();
    console.log("[info]: keypress logged: " + guessedLetter);

    // if the player sucessfully guesses the game's chosenLetter, reset # of guesses to 9, increment wins by 1, reset guessedLetters to an empty array
    if (guessedLetter === chosenLetter) {
        wins++;
        console.log("[VICTORY]: Game reset due to win.");
        beginNewRound();
        blink(green, 4);
        document.getElementById("errorReason").innerHTML = "You <b>won</b>!";
        }

    // if the player's guess isn't contained in lettersArray, tell them their guess isn't a letter and don't log it
    else if (lettersArray.indexOf(guessedLetter) === -1) {
        // message to the player: geez what were you thinking!  guess the LETTER, not the F key or number or something else
        document.getElementById("errorReason").innerHTML = "<b>" + guessedLetter + "</b> is not a letter of the (English) alphabet!";
        blink(yellow, 3);
        console.log("[warn]: Player input something other than a letter.")
    }

    // if the player has guessed a previously guessed letter, tell them they already guessed that and don't log it
    else if (guessedLetters.indexOf(guessedLetter) !== -1) {
        // message to the player: how bad is your memory!?  short term memory isn't THAT short
        document.getElementById("errorReason").innerHTML = "You already guessed <b>" + guessedLetter + "</b>!";
        blink(yellow, 3);
        console.log("[warn]: Player repeated a previously-guessed letter.")
    }

    // if the player runs out of guesses, reset # of guesses to 9, increment losses by 1, reset guessedLetters to an empty array
    else if (guesses === 1) {
        losses++;
        console.log("[DEFEAT]: Game reset due to loss.");
        beginNewRound();
        blink(red, 4);
        document.getElementById("errorReason").innerHTML = "You <b>lost</b>."
        }

    // if the player's guess is a letter of the alphabet (contained in lettersArray) AND hasn't already been guessed, accept it and decrement guesses by 1
    else if (lettersArray.indexOf(guessedLetter) !== -1 && guessedLetters.indexOf(guessedLetter) === -1) {
        guessedLetters.push(guessedLetter);
        guesses--;
        // show nothing in the error "box"
        document.getElementById("errorReason").innerHTML = "";
        updateGuesses();
        blink(gray, 1);
    }
    
    // closing off this huge if/elif block with an else that logs to the console.  I believe I have accounted for all possibilities, but I'm putting this in here so I know I missed something if I see this dumped to the console.
    else {
        console.log("[error]: Unknown error.  It should not be possible to trigger this.")
    };

};