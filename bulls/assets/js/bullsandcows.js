import React, { useState, useEffect } from 'react';
//import 'milligram';

import { ch_join, ch_push, ch_reset } from './socket';

function BullsAndCows() {
/*
	function genNum() {
		let nums = [];
		while (nums.length < 4) {
			let temp = Math.floor(Math.random() * 10);
			if (!nums.includes(temp)) {
				if (nums.length > 0 || temp != 0) {
					nums.push(temp);
				}
			}
		}
		return nums;
	}
*/
	const [guess, setGuess] = useState("");
	const [state, setState] = useState({
		guesses: [],
		evals: [],
		message: "",
		currGuess: 0,
		secretCode: [],
	});

	let {guesses, evals, message, currGuess, secretCode} = state;

	function updateGuess(ev) {
		setGuess(ev.target.value);
	}

	useEffect(() => {
		ch_join(setState);
	});

	function isValidGuess() {
		let guessArr = guess.split("");
		//console.log(guessArr);
		if (guessArr.length != 4) {
			return false;
		}
		for (var i = 0; i < guessArr.length; i++) {
			if (typeof guessArr[i].valueOf() == "number") {
				return false;
			}
			for (var j = i + 1; j < guessArr.length; j++) {
				if (guessArr[i] == guessArr[j]) {
					return false;
				}
			}
		}
		return true;
	}

	function evaluateGuess() {
		let guessSplit = guess.split("");
		let exactCount = 0;
		let presentCount = 0;
		for (var k = 0; k < guessSplit.length; k++) {
			if (guessSplit[k] == state.secretCode[k]) {
				exactCount++;
			}
			for (var m = 0; m < guessSplit.length; m++) {
				if (guessSplit[k] == state.secretCode[m] && m !== k) {
					presentCount++;
				}
			}
		}
		return exactCount + "A" + presentCount + "B";
	}

	function makeGuess() {
		//if (isValidGuess()) {
		//	let newGuesses = guesses;
		//	newGuesses.push(guess);
		//	setGuesses(newGuesses);
		//	setEvals(evals.concat(evaluateGuess()));
		//	setMessage("");
		//	setCurrGuess(currGuess + 1);
		//} else {
		//	setMessage(guess + " is an invalid guess. Try again");
		//}
		ch_push({num: guess});
		setGuess("");
	}

	//source for keypress - class notes on making hangman game
	//github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/04-react-intro/notes.md
	function keypress(ev) {
		if (ev.key == "Enter"){
			makeGuess();
		}
	}

	function gameWon() {
		if (state.currGuess === 0) {
			return false;
		}
		return state.evals[currGuess - 1].indexOf("4A") === 0;
	}

	function gameLost() {
		return state.guesses.length >= 8;
	}

	function newGame() {
		ch_reset();
	//	setGuesses([]);
	//	setEvals([]);
	//	setMessage("");
		setGuess("");
	//	setSecretCode(genNum);
	//	setCurrGuess(0);
	}

	function getGuess(index) {
		/*
		if (index >= state.guesses.length) {
			return " ";
		}
		return state.guesses[index];
		*/
		return " ";
	}

	function getEval(index) {
		/*
		if (index >= state.evals.length) {
			return " ";
		}
		return state.evals[index];
		*/
		return " ";
	}

	//if (gameWon()) {
	//	return (
	//		<div className="App">
	//			<h1>You won! The secret code was {secretCode}</h1>
	//			<p>
	//				<button onClick={newGame}>New Game</button>
	//			</p>
	//		</div>
	//	);
	//}

	if (gameLost()) {
		return (
			<div className="App">
				<h1>You ran out of guesses! The secret code was {secretCode}</h1>
				<p>
					<button onClick={newGame}>New Game</button>
				</p>
			</div>
		);
	}

	return (
		<div className="App">
			<h2>Bulls and Cows Game</h2>
			<div className="row">
				<div className="column">
					<h3>Guess</h3>
				</div>
				<div className="column">
					<h3>Result</h3>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(0)}</p>
				</div>
				<div className="column">
					<p>{getEval(0)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(1)}</p>
				</div>
				<div className="column">
					<p>{getEval(1)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(2)}</p>
				</div>
				<div className="column">
					<p>{getEval(2)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(3)}</p>
				</div>
				<div className="column">
					<p>{getEval(3)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(4)}</p>
				</div>
				<div className="column">
					<p>{getEval(4)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(5)}</p>
				</div>
				<div className="column">
					<p>{getEval(5)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(6)}</p>
				</div>
				<div className="column">
					<p>{getEval(6)}</p>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<p>{getGuess(7)}</p>
				</div>
				<div className="column">
					<p>{getEval(7)}</p>
				</div>
			</div>
			<p>You have {8-guesses.length} guesses left</p>
			<div className="row">
				<div className="column">
					<p><input type="text" value={guess} onChange={updateGuess} onKeyPress={keypress} /></p>
				</div>
				<div className="column">
					<p><button onClick={makeGuess}>Guess</button></p>
				</div>
			</div>
			<p>{message}</p>
			<p>
				<button onClick={newGame}>New Game</button>
			</p>
		</div>
	);
}

export default BullsAndCows;
