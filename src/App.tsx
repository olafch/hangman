import "./App.css";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { useEffect, useState } from "react";
import { getRandomWord } from "./helpers/getRandomWord";

export function App() {
	const [attempts, setAttempts] = useState(0);
	const [word, setWord] = useState(getRandomWord());
	const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length).trim());
	const [lose, setLose] = useState(false);
	const [won, setWon] = useState(false);

	const checkLetter = (letter: string) => {
		if (lose) return;
		if (won) return;
		if (!word.includes(letter)) {
			setAttempts(Math.min(attempts + 1, 9));
			return;
		}
		const hiddenWordArray = hiddenWord.split(" ");
		for (let i = 0; i < word.length; i++) {
			if (word[i] === letter) {
				hiddenWordArray[i] = letter;
			}
		}
		setHiddenWord(hiddenWordArray.join(" "));
	};

	const newGame = () => {
		const newWord = getRandomWord();
		setWord(newWord);
		setAttempts(0);
		setHiddenWord("_ ".repeat(newWord.length).trim());
		setLose(false);
		setWon(false);
	};

	useEffect(() => {
		if (attempts === 9) {
			setLose(true);
		}
	}, [attempts]);

	useEffect(() => {
		const currentHiddenWord = hiddenWord.split(" ").join("");
		if (currentHiddenWord === word) {
			setWon(true);
		}
	}, [hiddenWord]);

	return (
		<div className='App'>
			<HangImage imageNumber={attempts} />
			<h2>{hiddenWord}</h2>
			<h3>Attempts: {attempts}</h3>
			{lose ? <h2>You've lost... The correct word is {word}</h2> : ""}
			{won ? <h2>Winner! The word is {word}</h2> : ""}
			{letters.map(letter => (
				<button key={letter} onClick={() => checkLetter(letter)}>
					{letter}
				</button>
			))}
			<br />
			<button onClick={newGame}>New game</button>
		</div>
	);
}
