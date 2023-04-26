/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-loop-func */
import React, {useRef, useState} from 'react';
import Sider from './sideBoard/Sider';
import StartBoard from './startBoard/StartBoard';
import EndBoard from './endBoard/EndBoard';
import {Block, BlockArr, Color, Direction, StatusType} from './common/interface';

import './App.css';
import {scoringRules} from './common/constants';
import {getBlock, getMovingBlocks, refreshBlock} from './utils/block';
import {setPrecolor} from './utils/color';
import {downArrow, leftArrow, rightArrow, upArrow} from './utils/arrowAction';

export interface StartGameProps {
	selectedColor: Color,
}
const App = () => {
	const [status, setStatus] = useState('start' as StatusType);
	const [score, setScore] = useState(0);
	const mainArea = useRef(null);
	const prePattern = useRef(null);
	const arrowLeft = useRef(null);
	const arrowRight = useRef(null);
	const arrowUp = useRef(null);
	const arrowDown = useRef(null);
	// 使用state设置存在异步问题，color值无法及时更新
	let color: Color = 'green';
	// 可视化block数组
	const arrRow: 0[] = (new Array(16)).fill(0);
	const arr: BlockArr = (new Array(24)).fill(0).map(_ => [...arrRow]);

	// interval：移动block
	let moveNewBlock: any = null;

	const getMainArea = (): HTMLElement => {
		return mainArea && mainArea.current as any;
	}

	const getPrePattern = (): HTMLElement => {
		return prePattern && prePattern.current as any;
	}
	
	const getArrowLeft = (): HTMLElement => arrowLeft && arrowLeft.current as any;
	const getArrowRight = (): HTMLElement => arrowRight && arrowRight.current as any;
	const getArrowUp = (): HTMLElement => arrowUp && arrowUp.current as any;
	const getArrowDown = (): HTMLElement => arrowDown && arrowDown.current as any;

	//if full row ,remove and calculate score
	const fullRemove = (): void => {
		let time: number = 0;
		for (let i = 1; i < arr.length; i++) {
			if (!arr[i].includes(0)) {
				time++; //判断一次消除了几行
				//reset arr 
				for (let k = i; k > 0; k--) {
					arr[k] = arr[k - 1];
				}
				arr[0] = (new Array(16)).fill(0);
			}
		}
		refreshBlock({arr, main_area: getMainArea()});
		if (time > 0) {
			setScore((preState: number) => preState + scoringRules[time]);
		}
	}

	const addPreDom = (): void => {
		const pre_block: Block = getBlock(color);
		const pre_pattern: HTMLElement = getPrePattern();
		pre_pattern?.prepend(pre_block);
		setPrecolor(pre_block, pre_pattern);
	}
	
	const addMainDom = (): void => {
		const pre_pattern: HTMLElement = getPrePattern();
		const main_area: HTMLElement = getMainArea();
		const addblock: Block = pre_pattern?.querySelector(".type") as Block;
		const random_pos: number = Math.floor(Math.random() * 13);
		const top_distance: number = -addblock.arr.length;
		main_area.prepend(addblock);
		addblock.setAttribute("style", "top:" + top_distance + "rem;left:" + random_pos + "rem;");
		if (pre_pattern.querySelector(".type")) {
			pre_pattern.querySelector(".type")?.remove();
		}
		addPreDom();
	}

	const isOver = (): void => {
		if (arr[0].find(item => item !== 0)) {
			clearInterval(moveNewBlock);
			setStatus('end');
			return;
		}
		addMainDom();
	}
	
	const handleStartGame = (props: StartGameProps): void => {
		const {selectedColor} = props;
		setStatus('doing');
		color = selectedColor;
		clearInterval(moveNewBlock);
		const main_area: HTMLElement = getMainArea();
		main_area?.addEventListener("DOMNodeInserted", function () {
			const item: Block | null = getMovingBlocks(main_area);
			let temporaryArr: number[] = [];
			if (item) {
				moveNewBlock = setInterval(function () {
					let cur_row: number = parseFloat(item.style.top);
					let cur_col: number = parseFloat(item.style.left);
					for (let pos in item.boundary["bottom"]) {
						let row: number = item.boundary["bottom"][pos][0] + cur_row;
						let col: number = item.boundary["bottom"][pos][1] + cur_col;
						row = row < -1 ? -1 : row;
						if (row !== arr.length - 1 && arr[row + 1][col] === 0) {
							temporaryArr.push(1); //moving
						} else {
							temporaryArr.push(0); //stop moving
							break;
						}
					}
					let isStop: Boolean = temporaryArr.includes(0);
					if (isStop) {
						clearInterval(moveNewBlock);
						for (let dir in item.boundary) {
							const direction: Direction = dir as Direction;
							for (let index in item.boundary[direction]) {
								let row: number = item.boundary[direction][index][0] + cur_row;
								let col: number = item.boundary[direction][index][1] + cur_col;
								row = row < 0 ? 0 : row;
								arr[row][col] = item.color;
							}
						}
						item.remove();
						fullRemove();
						isOver();
					} else {
						item.style.top = parseFloat(item.style.top) + 1 + "rem";
					}
				}, 300)
			}
		})
	
		// 添加第一个block，触发listener
		addPreDom();
		addMainDom();
	
		//PC control block moving
		document.onkeydown = function (ev) {
			const main_area: HTMLElement = getMainArea();
			const item: Block | null = getMovingBlocks(main_area);
			if (item) {
				let cur_row: number = parseFloat(item.style.top);
				let cur_col: number = parseFloat(item.style.left);
				switch (ev.keyCode) {
					case 37:
						leftArrow({item, cur_row, cur_col, arr});
						break;
					case 39:
						rightArrow({item, cur_row, cur_col, arr});
						break;
					case 40:
						downArrow({item, cur_row, cur_col, arr, moveNewBlock, main_area});
						fullRemove();
						isOver();
						break;
					case 38:
						upArrow({item, cur_row, cur_col, arr});
						break;
				}
			}
		}

		getArrowLeft()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(main_area);
			if (item) {
				const cur_row = parseFloat(item.style.top);
				const cur_col = parseFloat(item.style.left);
				leftArrow({item, cur_row, cur_col, arr});
			}
		})
		getArrowRight()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(main_area);
			if (item) {
				const cur_row = parseFloat(item.style.top);
				const cur_col = parseFloat(item.style.left);
				rightArrow({item, cur_row, cur_col, arr});
			}
	
		})
		getArrowDown()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(main_area);
			if (item) {
				const cur_row = parseFloat(item.style.top);
				const cur_col = parseFloat(item.style.left);
				downArrow({item, cur_row, cur_col, arr, moveNewBlock, main_area});
				fullRemove();
				isOver();
			}
		})
		getArrowUp()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(main_area);
			if (item) {
				const cur_row = parseFloat(item.style.top);
				const cur_col = parseFloat(item.style.left);
				upArrow({item, cur_row, cur_col, arr});
			}
		})
	}

	return (
		<div className="container">
			<div className="box" ref={mainArea}>
				{status === 'start' && (
					<StartBoard startGame={handleStartGame} />
				)}
				{status === 'end' && <EndBoard finalScore={score} />}
			</div>
			<Sider
				currentScore={score}
				prePattern={prePattern}
				curStatus={status}
				arrows={{left: arrowLeft, right: arrowRight, up: arrowUp, down: arrowDown}}
			/>
		</div>
	);
}

export default App;
