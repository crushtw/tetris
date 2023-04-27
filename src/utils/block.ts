import {blockTypes} from "../common/constants";
import {CreateBlockProps, TypeCondition, Color, Block, BlockArr} from "../common/interface";
import {getRandomColor} from "./color";

export const getTypeCondition = (arr: number[][]): TypeCondition => {
    let typeCondition: TypeCondition = {
        left: {},
        right: {},
        bottom: {},
        top: {}
    };

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] !== 0) {
                if (j === 0 || arr[i][j - 1] === 0) {
                    typeCondition["left"][i] = [i, j];
                }
                if (j === arr[i].length - 1 || arr[i][j + 1] === 0) {
                    typeCondition["right"][i] = [i, j];
                }
                if (i === arr.length - 1 || arr[i + 1][j] === 0) {
                    typeCondition["bottom"][j] = [i, j];
                }
                if (i === 0 || arr[i - 1][j] === 0) {
                    typeCondition["top"][j] = [i, j];
                }
            }
        }
    }
    return typeCondition;
}

export const getBlock = (color: Color): Block => {
	const index = Math.floor(Math.random() * 6 + 1);
	const block: CreateBlockProps = blockTypes[index];
	return createBlock({...block, color});
}

export const createBlock = (props: CreateBlockProps & {color: Color}): Block => {
    const newBlock: any = document.createElement("div");
    newBlock.className = `type ${props.className}`;
    newBlock.state = 0;
    newBlock.arr = props.arr;
    newBlock.color = getRandomColor(props.color);
    newBlock.boundary = getTypeCondition(props.arr);
    newBlock.innerHTML = props.innerHTML
    return newBlock as Block;
}

interface RefreshBlockProps {
	mainArea: HTMLElement,
	arr: BlockArr,
}
//  use arr to render blocks
export const refreshBlock = (props: RefreshBlockProps): void => {
	const {mainArea, arr} = props;
	const oldDiv: NodeListOf<Element> = document.querySelectorAll(".block-arr");
	for (let old of Array.from(oldDiv)) {
		old.remove();
	}
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] !== 0) {
				const div: HTMLDivElement = document.createElement('div');
				div.className = "block-arr";
				mainArea.prepend(div);
				div.style.background = arr[i][j] as string;
				div.style.top = i + "rem";
				div.style.left = j + "rem";
			}
		}
	}
}

//transposeBlock arr
export const transposeBlock = (originArr: number[][]): number[][] => {
	const newArr: number[][] = [];
	for (let i = 0; i < originArr[0].length; i++) {
		newArr[i] = [];
		for (let j = 0; j < originArr.length; j++) {
			newArr[i][j] = originArr[originArr.length - 1 - j][i];
		}
	}
	return newArr;
}

// 获取移动中的blocks
export const getMovingBlocks = (mainArea: HTMLElement): Block | null => {
	if (mainArea) {
		return mainArea.querySelector(".type")
	}
	return null;
}