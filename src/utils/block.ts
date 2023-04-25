import {blockTypes} from "../common/constants";
import {CreateBlockProps, TypeCondition, Color, Block} from "../common/interface";
import {getRandomColor} from "./color";

export const getTypeCondition = (arr: number[][]): TypeCondition => {
    let type_condition: TypeCondition = {
        left: {},
        right: {},
        bottom: {},
        top: {}
    };

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] !== 0) {
                if (j === 0 || arr[i][j - 1] === 0) {
                    type_condition["left"][i] = [i, j];
                }
                if (j === arr[i].length - 1 || arr[i][j + 1] === 0) {
                    type_condition["right"][i] = [i, j];
                }
                if (i === arr.length - 1 || arr[i + 1][j] === 0) {
                    type_condition["bottom"][j] = [i, j];
                }
                if (i === 0 || arr[i - 1][j] === 0) {
                    type_condition["top"][j] = [i, j];
                }
            }
        }
    }
    return type_condition;
}

export const getBlock = (color: Color): Block => {
	const index = Math.floor(Math.random() * 6 + 1);
	const block: CreateBlockProps = blockTypes[index];
	return createBlock({...block, color});
}

export const createBlock = (props: CreateBlockProps & {color: Color}): Block => {
    const new_block: any = document.createElement("div");
    new_block.className = `type ${props.className}`;
    new_block.state = 0;
    new_block.arr = props.arr;
    new_block.color = getRandomColor(props.color);
    new_block.boundary = getTypeCondition(props.arr);
    new_block.innerHTML = props.innerHTML
    return new_block as Block;
}

//  use arr to render blocks
export const refreshBlock = (arr: (string | number)[][], main_area: HTMLElement & Block): void => {
	const old_div = document.querySelectorAll(".block-arr");
	for (let old of Array.from(old_div)) {
		old.remove();
	}
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] !== 0) {
				let div = document.createElement('div');
				div.className = "block-arr";
				main_area.prepend(div);
				div.style.background = arr[i][j] as string;
				div.style.top = i + "rem";
				div.style.left = j + "rem";
			}
		}
	}
}

//transpose arr
export const transpose = (origin_arr: number[][]): number[][] => {
	const new_arr: number[][] = [];
	for (let i = 0; i < origin_arr[0].length; i++) {
		new_arr[i] = [];
		for (let j = 0; j < origin_arr.length; j++) {
			new_arr[i][j] = origin_arr[origin_arr.length - 1 - j][i];
		}
	}
	return new_arr;
}
