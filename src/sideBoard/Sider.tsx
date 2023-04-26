import React from 'react';
import './Sider.css';
import {StatusType} from '../common/interface';

interface SiderProps {
	currentScore: number,
	prePattern: React.MutableRefObject<any>,
	curStatus: StatusType,
	arrows: {[key: string]: React.MutableRefObject<any>}
}

const Sider = (props: SiderProps) => {
	const {
		currentScore,
		prePattern,
		curStatus,
		arrows: {left, right, down, up}
	} = props;

	return (
		<div id="tools" className="tool" style={{display: curStatus === 'start' ? 'none' : 'flex'}}>
			<p className="score">Score:<span> {currentScore}</span></p>
			<div className="next-pattern-box">
				<p>next pattern</p>
				<div className="pre-pattern" ref={prePattern}></div>
			</div>
            <div className="arrow-control">
                <img src={require('../images/arrow-up.svg')} alt='up' ref={up}></img>
                <div className="l-r-arrow">
					<img src={require('../images/arrow-left.svg')} alt='left' ref={left}></img>
					<img src={require('../images/arrow-right.svg')} alt='right' ref={right}></img>
                </div>
                <img src={require('../images/arrow-down.svg')} alt='down' ref={down}></img>
            </div>
		</div>
  );
}

export default Sider;
