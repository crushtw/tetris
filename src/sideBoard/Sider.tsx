import React from 'react';
import './Sider.css';

interface SiderProps {
	currentScore: number,
	prePattern: React.MutableRefObject<any>,
}

const Sider = (props: SiderProps) => {
	const {currentScore, prePattern} = props;

	return (
		<div id="tools" className="tool">
			<p className="score">Score:<span> {currentScore}</span></p>
			<div className="next-pattern-box">
				<p>next pattern</p>
				<div className="pre-pattern" ref={prePattern}></div>
			</div>
		</div>
  );
}

export default Sider;
