import React, {useState} from "react";
import {blockColor, allColor} from "../common/constants";
import './StartBoard.css';
import {Color} from "../common/interface";
import {StartGameProps} from "../App";

interface StartBoardProps {
	startGame: (props: StartGameProps) => void;
	setRealColor: (color: Color) => void;
}

const StartBoard = (props: StartBoardProps) => {
	const {startGame, setRealColor} = props;
	const [selectedColor, setSelectedColor] = useState('green' as Color);
	const getColor = (text: Color): void => {
		setSelectedColor(text);
		setRealColor(text);
	}
	const clickToStart = (): void => {
		startGame({selectedColor});
	}

	return (
		<div className="start-board">
			<p
				className="game-name"
				style={{backgroundColor: allColor[selectedColor][5]}}
			>tetris</p>
            <p>choose color</p>
			<div className="startBoardList">
				{blockColor.map(text => {
					const selectColor: string = selectedColor === text
						? 'selectColor'
						: '';
					const background: string = selectedColor === text
						? allColor[text][5]
						: ''

					return (
						<p
							key={text}
							className={`color ${selectColor}`}
							style={{background}}
							onClick={() => getColor(text)}
						>{text}</p>
					)
				})}
			</div>
			<div
				className="btn start-btn"
				onClick={clickToStart}
				style={{background: allColor[selectedColor][5]}}
			>start</div>
   		 </div>
	);
}

export default StartBoard;
