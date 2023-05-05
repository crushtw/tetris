/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-loop-func */
import React, {useRef, useState} from 'react';
import Sider from './sideBoard/Sider';
import StartBoard from './startBoard/StartBoard';
import EndBoard from './endBoard/EndBoard';
import {Block, BlockArr, Color, Direction, StatusType} from './common/interface';

import {colorBgMap, scoringRules} from './common/constants';
import {getBlock, getMovingBlocks, refreshBlock} from './utils/block';
import {setPrecolor} from './utils/color';
import {downArrow, leftArrow, rightArrow, upArrow} from './utils/arrowAction';
import './App.css';

const App = () => {
	const [status, setStatus] = useState('start' as StatusType);
	const [score, setScore] = useState(0);
	const [realColor, setRealColor] = useState('green' as Color);
	const mainArea = useRef(null);
	const prePattern = useRef(null);
	const arrowLeft = useRef(null);
	const arrowRight = useRef(null);
	const arrowUp = useRef(null);
	const arrowDown = useRef(null);

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
		refreshBlock({arr, mainArea: getMainArea()});
		if (time > 0) {
			setScore((preState: number) => preState + scoringRules[time]);
		}
	}

	const getRealColor = (color: Color): void => {
		setRealColor(color);
	}

	const addPreDom = (): void => {
		const preBlock: Block = getBlock(realColor);
		const prePattern: HTMLElement = getPrePattern();
		prePattern?.prepend(preBlock);
		setPrecolor(preBlock, prePattern);
	}
	
	const addMainDom = (): void => {
		const prePattern: HTMLElement = getPrePattern();
		const mainArea: HTMLElement = getMainArea();
		const addblock: Block = prePattern?.querySelector(".type") as Block;
		const randomPos: number = Math.floor(Math.random() * 13);
		const topDistance: number = -addblock.arr.length;
		mainArea.prepend(addblock);
		addblock.setAttribute("style", "top:" + topDistance + "rem;left:" + randomPos + "rem;");
		if (prePattern.querySelector(".type")) {
			prePattern.querySelector(".type")?.remove();
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
	
	const handleStartGame = (): void => {
		setStatus('doing');
		clearInterval(moveNewBlock);
		const mainArea: HTMLElement = getMainArea();
		mainArea?.addEventListener("DOMNodeInserted", function () {
			const item: Block | null = getMovingBlocks(mainArea);
			let temporaryArr: number[] = [];
			if (item) {
				moveNewBlock = setInterval(function () {
					let curRow: number = parseFloat(item.style.top);
					let curCol: number = parseFloat(item.style.left);
					for (let pos in item.boundary["bottom"]) {
						let row: number = item.boundary["bottom"][pos][0] + curRow;
						let col: number = item.boundary["bottom"][pos][1] + curCol;
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
								let row: number = item.boundary[direction][index][0] + curRow;
								let col: number = item.boundary[direction][index][1] + curCol;
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
			const mainArea: HTMLElement = getMainArea();
			const item: Block | null = getMovingBlocks(mainArea);
			if (item) {
				let curRow: number = parseFloat(item.style.top);
				let curCol: number = parseFloat(item.style.left);
				switch (ev.keyCode) {
					case 37:
						leftArrow({item, curRow, curCol, arr});
						break;
					case 39:
						rightArrow({item, curRow, curCol, arr});
						break;
					case 40:
						downArrow({item, curRow, curCol, arr, moveNewBlock, mainArea});
						fullRemove();
						isOver();
						break;
					case 38:
						upArrow({item, curRow, curCol, arr});
						break;
				}
			}
		}

		getArrowLeft()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(mainArea);
			if (item) {
				const curRow = parseFloat(item.style.top);
				const curCol = parseFloat(item.style.left);
				leftArrow({item, curRow, curCol, arr});
			}
		})
		getArrowRight()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(mainArea);
			if (item) {
				const curRow = parseFloat(item.style.top);
				const curCol = parseFloat(item.style.left);
				rightArrow({item, curRow, curCol, arr});
			}
	
		})
		getArrowDown()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(mainArea);
			if (item) {
				const curRow = parseFloat(item.style.top);
				const curCol = parseFloat(item.style.left);
				downArrow({item, curRow, curCol, arr, moveNewBlock, mainArea});
				fullRemove();
				isOver();
			}
		})
		getArrowUp()?.addEventListener("click", function () {
			const item: Block | null = getMovingBlocks(mainArea);
			if (item) {
				const curRow = parseFloat(item.style.top);
				const curCol = parseFloat(item.style.left);
				upArrow({item, curRow, curCol, arr});
			}
		})
	}

	return (
		<div className="container">
			<div
				className="box"
				ref={mainArea}
				style={{
					background: status === 'start'
						? `url(${colorBgMap.get(realColor)}) center/cover`
						: ''
				}}
			>
				{status === 'start' && (
					<StartBoard
						startGame={handleStartGame}
						setRealColor={getRealColor}
					/>
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
