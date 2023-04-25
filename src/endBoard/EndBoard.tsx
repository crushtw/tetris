import React from "react";
import './EndBoard.css';
import {Button} from "antd";

const EndBoard = () => {

	const handleReStart = () => {
		window.location.reload();
	}

	return (
		<div className="endBoard">
			<p className="over">Game over</p>
			<p className="score">
				score：<span id="last_score"> </span>
			</p>
			<p className="highest">
				Highest score：
				<span id="highest_score"></span>
			</p>
			<Button type="primary" onClick={handleReStart}>restart</Button>
		</div>
	);
};

export default EndBoard;
