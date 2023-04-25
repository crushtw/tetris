import React, {useState} from "react";
import { blockColor, allColor} from "../common/constants";
import './StartBoard.css';
import {Button} from "antd";
import {Color, StatusType} from "../common/interface";

interface StartBoardProps {
	switchStatus: (nextStatus: StatusType) => void;
	selectColor: (color: Color) => void;
}

const StartBoard = (props: StartBoardProps) => {
	const {switchStatus, selectColor} = props;
	const [selectedColor, setSelectedColor] = useState('green' as Color);
	const getColor = (text: Color) => {
		setSelectedColor(text);
	}
	const clickToStart = () => {
		switchStatus('doing');
		selectColor(selectedColor);
	}

	return (
		<div className="startBoard">
            <p>请选择颜色</p>
			<div className="startBoardList">
				{blockColor.map(item => (
					<p
						className="color"
						style={{
							borderColor: item.borderColor,
							background: selectedColor === item.text ? allColor[item.text][3] : '',
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
