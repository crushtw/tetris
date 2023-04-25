import React, {useState} from "react";
import { blockColor, allColor} from "../common/constants";
import './StartBoard.css';
import {Color} from "../common/interface";
import {StartGameProps} from "../App";

interface StartBoardProps {
	startGame: (props: StartGameProps) => void;
}

const StartBoard = (props: StartBoardProps) => {
	const {startGame} = props;
	const [selectedColor, setSelectedColor] = useState('green' as Color);
	const getColor = (text: Color): void => {
		setSelectedColor(text);
	}
	const clickToStart = (): void => {
		startGame({nextStatus: 'doing', selectedColor});
	}

	return (
		<div className="startBoard">
            <p>choose color</p>
			<div className="startBoardList">
				{blockColor.map(item => {
					const selectColor: string = selectedColor === item.text
						? 'selectColor'
						: '';
					const background: string = selectedColor === item.text
						? allColor[item.text][6]
						: ''

					return (
						<p
							key={item.text}
							className={`color ${selectColor}`}
							style={{background}}
							onClick={() => getColor(item.text)}
						>{item.text}</p>
					)
				})}
			</div>
			<div className="btn" onClick={clickToStart}>start</div>
   		 </div>
	);
}

export default StartBoard;
