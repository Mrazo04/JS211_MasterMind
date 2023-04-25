"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let solution = "abcd";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess) => {
  // your code here

  //splits a string into an array of substrings, and returns the array
  let solutionArray = solution.split("");
  let guessArray = guess.split("");

  let correctLetterLocations = 0;
  let correctLetters = 0;
  let targetIndex;

  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] == guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  guessArray.forEach((letter) => {
    targetIndex = solutionArray.indexOf(letter);
    //console.log(targetIndex)

    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
      //console.log(correctLetters)
      //console.log(solutionArray)

      let hint =
        "There are " +
        correctLetterLocations +
        " letter(s) in the correct position and " +
        correctLetters +
        " correct letter(s) NOT in the correct position.";
      //console.log(hint)

      board.push(guess + ": " + hint);
      //console.log(board)

      let answer = "You ran out of turns! The answer is: " + solution;
      let tryAgain = "Guess again.";

      if (board.length == 10) {
        return answer;
      } else {
        return tryAgain;
      }
    }
  });
};

const mastermind = (guess) => {
  //solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  generateHint(guess);
  // detecting a win
  if (guess == solution) {
    return "You guessed it!";
  }
};

const getPrompt = () => {
  rl.question("guess: ", (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === "function") {
  solution = "abcd";
  describe("#mastermind()", () => {
    it("should register a guess and generate hints", () => {
      mastermind("aabb");
      assert.equal(board.length, 1);
    });
    it("should be able to detect a win", () => {
      assert.equal(mastermind(solution), "You guessed it!");
    });
  });

  describe("#generateHint()", () => {
    it("should generate hints", () => {
      assert.equal(generateHint("abdc"), "2-2");
    });
    it("should generate hints if solution has duplicates", () => {
      assert.equal(generateHint("aabb"), "1-1");
    });
  });
} else {
  generateSolution();
  getPrompt();
}
