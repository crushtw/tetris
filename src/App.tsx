/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-loop-func */
import React, {useRef, useState} from 'react';
import Sider from './sideBoard/Sider';
import StartBoard from './startBoard/StartBoard';
import EndBoard from './endBoard/EndBoard';
import {Block, BlockArr, Color, Direction, StatusType, TypeCondition} from './common/interface';

import './App.css';
import {scoringRules} from './common/constants';
import {getBlock, getTypeCondition, transpose} from './utils/block';
import {setPrecolor} from './utils/color';

export interface StartGameProps {
	nextStatus: StatusType,
	selectedColor: Color,
}
const App = () => {
	const [status, setStatus] = useState('start');
	const [score, setScore] = useState(0);
	const mainArea = useRef(null);
	const prePattern = useRef(null);
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

	// 获取移动中的blocks
	const getMovingBlocks = (): any[] => {
		if (mainArea && mainArea.current) {
			let list: NodeList = (mainArea.current as any).querySelectorAll(".type")
			return Array.from(list);
		}
		return [];
	}

	//  use arr to render blocks
	const refreshBlock = (): void => {
		const old_div: NodeListOf<Element> = document.querySelectorAll(".block-arr");
		const main_area: HTMLElement = getMainArea();
		for (let old of Array.from(old_div)) {
			old.remove();
		}
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				if (arr[i][j] !== 0) {
					const div: HTMLDivElement = document.createElement('div');
					div.className = "block-arr";
					main_area.prepend(div);
					div.style.background = arr[i][j] as string;
					div.style.top = i + "rem";
					div.style.left = j + "rem";
				}
			}
		}
	}
	
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
		refreshBlock();
		if (time > 0) {
			setScore((preState: number) => preState + scoringRules[time]);
		}
	}

	const addPreDom = (): void => {
		const pre_block: Block = getBlock(color);
		const pre_pattern: HTMLElement = getPrePattern();
		pre_pattern.prepend(pre_block);
		setPrecolor(pre_block, pre_pattern);
	}
	
	const addMainDom = (): void => {
		const pre_pattern: HTMLElement = getPrePattern();
		const main_area: HTMLElement = getMainArea();
		const addblock: Block = pre_pattern.querySelector(".type") as Block;
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

	//function move to left 
	const leftArrow = (item: Block, cur_row: number, cur_col: number): void => {
		const temporaryArr = [];
		for (let pos in item.boundary["left"]) {
			let row: number = item.boundary["left"][pos][0] + cur_row;
			let col: number = item.boundary["left"][pos][1] + cur_col;
			// if row<0,can't get arr and cause error
			row = row < 0 ? 0 : row;
			if (col !== 0 && arr[row][col - 1] === 0) {
				temporaryArr.push(1);
			} else {
				temporaryArr.push(0);
			}
		}
		let isMove: boolean = !temporaryArr.includes(0);
		if (isMove) {
			item.style.left = parseFloat(item.style.left) - 1 + "rem";
		}
	}
	// function move to right
	const rightArrow = (item: Block, cur_row: number, cur_col: number): void => {
		const temporaryArr = [];
		for (let pos in item.boundary["right"]) {
			let row: number = item.boundary["right"][pos][0] + cur_row;
			let col: number = item.boundary["right"][pos][1] + cur_col;
			row = row < 0 ? 0 : row;
			if (col !== arr[0].length - 1 && arr[row][col + 1] === 0) {
				temporaryArr.push(1);
			} else {
				temporaryArr.push(0);
			}
		}
		let isMove = !temporaryArr.includes(0);
		if (isMove) {
			item.style.left = parseFloat(item.style.left) + 1 + "rem";
		}
	}
	// function move to down
	const downArrow = (item: Block, cur_row: number, cur_col: number): void => {
		clearInterval(moveNewBlock);
		// block 向下移动的最小距离
		let min_distance = 100;
		for (let pos in item.boundary["bottom"]) {
			let row: number = item.boundary["bottom"][pos][0] + cur_row;
			let col: number = item.boundary["bottom"][pos][1] + cur_col;
			const amendRowDif = item.arr.length;
			for (let i = row + amendRowDif; i < arr.length; i++) {
				if (arr[i][col] !== 0) {
					if (i - row - 1 < min_distance) {
						min_distance = i - row - 1;
					}
					break;
				}
			}
		}
		if (min_distance === 100) {
			item.style.top = arr.length - item.arr.length + "rem";
		} else {
			item.style.top = min_distance + parseFloat(item.style.top) + "rem";
		}
		cur_row = parseFloat(item.style.top);
		cur_col = parseFloat(item.style.left);
		for (let dir in item.boundary) {
			const direction: Direction = dir as Direction;
			for (let index in item.boundary[direction]) {
				let row: number = item.boundary[direction][index][0] + cur_row;
				let col: number = item.boundary[direction][index][1] + cur_col;
				if (row >= 0) {
					arr[row][col] = item.color;
				}
			}
		}
		item.remove();
		refreshBlock();
		fullRemove();
		isOver();
	}
	// function change direction
	const upArrow = (item: Block, cur_row: number, cur_col: number): void => {
		const judge_arr: number[][] = transpose(item.arr);
		const judge_boundary: TypeCondition = getTypeCondition(judge_arr);
		const isFarthest: boolean = cur_col + judge_arr[0].length <= 16;
		const isHasBlocksArr: boolean[] = [];
		for (let dir in judge_boundary) {
			const direction: Direction = dir as Direction;
			for (let block_site in judge_boundary[direction]) {
				let row: number = judge_boundary[direction][block_site][0] + cur_row;
				let col: number = judge_boundary[direction][block_site][1] + cur_col;
				row = row < 0 ? 0 : row;
				if (arr[row][col] === 0) { //moving
					isHasBlocksArr.push(false);
				} else { //don‘t move
					isHasBlocksArr.push(true);
					return;
				}
			}
		}
		let isHasBlocks: boolean = !isHasBlocksArr.includes(true);
		if (isFarthest && isHasBlocks) {
			switch (item.state) {
				case 0:
					item.style.transformOrigin = "0 0";
					item.style.transform = "rotate(90deg) translate(0,-100%)";
					item.arr = judge_arr;
					item.boundary = getTypeCondition(item.arr);
					item.state = 1;
					break;
				case 1:
					item.style.transformOrigin = "0 0";
					item.style.transform = "rotate(180deg) translate(-100%,-100%)";
					item.arr = judge_arr;
					item.boundary = getTypeCondition(item.arr);
					item.state = 2;
					break;
				case 2:
					item.style.transformOrigin = "0 0";
					item.style.transform = "rotate(270deg) translate(-100%,0)";
					item.arr = judge_arr;
					item.boundary = getTypeCondition(item.arr);
					item.state = 3;
					break;
				case 3:
					item.style.transform = "none";
					item.arr = judge_arr;
					item.boundary = getTypeCondition(item.arr);
					item.state = 0;
					break;
			}

		}
	}
	
	const handleStartGame = (props: StartGameProps): void => {
		const {nextStatus, selectedColor} = props;
		setStatus(nextStatus);
		color = selectedColor;
		clearInterval(moveNewBlock);
		const main_area: HTMLElement = getMainArea();
		main_area?.addEventListener("DOMNodeInserted", function () {
			const blocks = getMovingBlocks();
			let temporaryArr: number[] = [];
			for (let item of blocks) {
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
						}
					}
					let isStop: Boolean = temporaryArr.includes(0);
					if (isStop) {
						clearInterval(moveNewBlock);
						for (let direction in item.boundary) {
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
			const blocks = getMovingBlocks();
			for (let item of blocks) {
				let cur_row: number = parseFloat(item.style.top);
				let cur_col: number = parseFloat(item.style.left);
				switch (ev.keyCode) {
					case 37:
						leftArrow(item, cur_row, cur_col);
						break;
					case 39:
						rightArrow(item, cur_row, cur_col);
						break;
					case 40:
						downArrow(item, cur_row, cur_col);
						break;
					case 38:
						upArrow(item, cur_row, cur_col);
				}
			}
		}
	}

	return (
		<div className="container">
			<div className="box" ref={mainArea}>
				{status === 'start' && (
					<StartBoard startGame={handleStartGame} />
				)}
				{status === 'end' && <EndBoard finalScore={score} />}
			</div>
			<Sider currentScore={score} prePattern={prePattern} />
		</div>
	);
}

export default App;
