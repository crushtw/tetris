import React from 'react';
import './Sider.css';

const Sider = () => {
	
  return (
	<div id="tools" className="tool">
	<p className="score">Score:<span id="cur_score"> 0</span></p>
	<div className="next-pattern-box">
		<p>next pattern</p>
		<div className="pre-pattern" id="pre_pattern">

		</div>
	</div>
	<div className="mobile-control">
		<div id="arrowup" className="glyphicon glyphicon-arrow-up control-arrow"></div>
		<div className="l-r-arrow">
			<div id="arrowleft" className="glyphicon glyphicon-arrow-left control-arrow"></div>
			<div id="arrowright" className="glyphicon glyphicon-arrow-right control-arrow"></div>
		</div>
		<div id="arrowdown" className="glyphicon glyphicon-arrow-down control-arrow"></div>
	</div>
</div>
  );
}

export default Sider;
