import React from "react";
import './EndBoard.css';

interface EndBoardProps {
	finalScore: number;
}
const EndBoard = (props: EndBoardProps) => {
	const {finalScore} = props;
	const handleReStart = (): void => {
		window.location.reload();
	}

	const highestScore = (): number => {
		const history: undefined | string = localStorage.gameHightestScore;
		if (!history) {
			localStorage.gameHightestScore = 0;
			return 0;
		}
		if (+history < finalScore) {
			localStorage.setItem("gameHightestScore", String(finalScore));
			return finalScore;
		}
		return +history;
	}

	return (
		<div className="end-board">
			<p className="over">Game over</p>
			<p className="score">
				score：<span id="last_score">{finalScore}</span>
			</p>
			<p className="highest">
				Highest score：
				<span id="highest_score">{highestScore()}</span>
			</p>
			<div className="btn" onClick={handleReStart}>restart</div>
		</div>
	);
};

export default EndBoard;
