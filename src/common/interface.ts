export type Color = 'green' | 'yellow' | 'red' | 'purple' | 'blue' | 'pink';
export type NumIndex = '1' | '2' | '3' | '4' | '5' | '6';
export type Direction = 'left' | 'right' | 'bottom' | 'top';
export interface BlockColor {
	text: Color,
	borderColor: string,
	backgroundColor?: string,
}

export type StatusType = 'start' | 'doing' | 'end';

export interface CreateBlockProps {
	arr: number[][],
	innerHTML: string,
	className: string,
	color?: Color,
}

export interface TypeCondition {
	left: {[key: string]: [number, number]},
	right: {[key: string]: [number, number]},
	top: {[key: string]: [number, number]},
	bottom: {[key: string]: [number, number]},
}

export interface BlockTypes {
	[key: string]: CreateBlockProps,
}
export interface Block extends HTMLElement {
	className: string,
	state: number,
	arr: number[][],
	color: string,
	boundary: TypeCondition,
	innerHTML: string,
}

export type BlockArr = (0 | string)[][];

export interface ArrowActionProps {
	arr: BlockArr,
	item: Block,
	cur_row: number,
	cur_col: number,
}