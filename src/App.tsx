import React, {useState} from 'react';
import Sider from './sideBoard/Sider';
import StartBoard from './startBoard/StartBoard';
import EndBoard from './endBoard/EndBoard';
import {Color, StatusType} from './common/interface';

import './App.css';

const App = () => {
	const [status, setStatus] = useState('start');
	const [color, setColor] = useState('green');

	const handleSwitchStatus = (nextStatus: StatusType) => {
		setStatus(nextStatus);
	}

	const handleSelectColor = (color: Color) => {
		setColor(color);
	}

	return (
		<div className="container">
			<div className="box">
				{status === 'start' && (
					<StartBoard
						switchStatus={handleSwitchStatus}
						selectColor={handleSelectColor}
					/>
				)}
				{status === 'end' && <EndBoard />}
			</div>
			<Sider />
		</div>
	);
}

export default App;
