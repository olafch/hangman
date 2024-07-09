import "./App.css";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { useState } from "react";

export function App() {
	const [attempts, setAttempts] = useState(0);

	const word = "COMPUTER";

	const checkLetter = (letter: string) => {
		console.log(letter);
		setAttempts(Math.min(attempts + 1, 9));
	};

	return (
		<div className='App'>
			<HangImage imageNumber={attempts} />
			<h2>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _</h2>
			<h3>Attempts: {attempts}</h3>
			{letters.map(letter => (
				<button
					style={{ backgroundColor: "lightpink" }}
					key={letter}
					onClick={() => checkLetter(letter)}
				>
					{letter}
				</button>
			))}
		</div>
	);
}
