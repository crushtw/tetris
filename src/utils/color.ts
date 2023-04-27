import {allColor} from "../common/constants";
import {Block, Color, NumIndex} from "../common/interface";

export const getRandomColor = (color: Color): string => {
	const ranNum: NumIndex = String(Math.floor(Math.random() * 5) + 1) as NumIndex;
    return allColor[color][ranNum];
}

//set pre color
export const setPrecolor = (pre: Block, prePattern: HTMLElement) => {
	const colorBlocks: NodeList = prePattern.querySelectorAll(".block");
	for (let cb of Array.from(colorBlocks)) {
		(cb as HTMLElement).style.background = pre.color;
	}
}