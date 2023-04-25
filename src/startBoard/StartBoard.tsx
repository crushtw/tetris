import React, {useState} from "react";
import { blockColor, allColor} from "../common/constants";
import './StartBoard.css';
import {Button} from "antd";
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
            <p>请选择颜色</p>
			<div className="startBoardList">
				{blockColor.map(item => (
					<p
						key={item.text}
						className="color"
						style={{
							borderColor: item.borderColor,
							background: selectedColor === item.text ? allColor[item.text][2] : '',
						}}
						onClick={() => getColor(item.text)}
					>{item.text}</p>
				))}
			</div>
			<Button type="primary" onClick={clickToStart}>start</Button>
   		 </div>
	);
}

export default StartBoard;
