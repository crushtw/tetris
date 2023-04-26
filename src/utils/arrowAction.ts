import {ArrowActionProps, Direction, TypeCondition} from "../common/interface";
import {getTypeCondition, refreshBlock, transposeBlock} from "./block";

//function move to left 
export const leftArrow = (props: ArrowActionProps): void => {
	const {item, cur_row, cur_col, arr} = props;
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
export const rightArrow = (props: ArrowActionProps): void => {
	const {item, cur_row, cur_col, arr} = props;
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
export const downArrow = (props: ArrowActionProps & {main_area: HTMLElement, moveNewBlock: any}): void => {
	const {item, arr, moveNewBlock, main_area} = props;
	let {cur_row, cur_col} = props;
	clearInterval(moveNewBlock);
	// block 向下移动的最小距离
	let min_distance = 100;
	for (let pos in item.boundary["bottom"]) {
		let row: number = item.boundary["bottom"][pos][0] + cur_row;
		let col: number = item.boundary["bottom"][pos][1] + cur_col;
		for (let i = row; i < arr.length; i++) {
			if (i < 0) continue;
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
	refreshBlock({arr, main_area});
}
// function change direction
export const upArrow = (props: ArrowActionProps): void => {
	const {item, cur_row, cur_col, arr} = props;
	const judge_arr: number[][] = transposeBlock(item.arr);
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
};
