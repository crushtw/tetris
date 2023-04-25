import {allColor} from "../common/constants";
import {Block, Color, NumIndex} from "../common/interface";

export const getRandomColor = (color: Color): string => {
	const ranNum: NumIndex = String(Math.floor(Math.random() * 5) + 1) as NumIndex;
    return allColor[color][ranNum];
}

//set pre color
export const setPrecolor = (pre: Block, pre_pattern: HTMLElement) => {
	const color_blocks: NodeList = pre_pattern.querySelectorAll(".block");
	for (let cb of Array.from(color_blocks)) {
		(cb as HTMLElement).style.background = pre.color;
	}
}