import {ArrowData, Color, BlockTypes} from "./interface";
import yellowBg from '../assets/images/yellow.jpg';
import greenBg from '../assets/images/green.jpg';
import redBg from '../assets/images/red.jpg';
import blueBg from '../assets/images/blue.jpg';
import purpleBg from '../assets/images/purple.jpg';
import pinkBg from '../assets/images/pink.jpg';


export const blockColor: Color[] = ['yellow', 'blue','pink', 'purple', 'red', 'green'];

export const allColor: {[key: string]: {[key: string]: string}} = {
	green: {
		"1": "#5c9943",
		"2": "#2f6e59",
		"3": "#7bc9b0",
		"4": "#4eac84",
		"5": "#3f8a87",
		"6": "#83d77d"
	},
	pink: {
		"1": "rgb(254,156,171)",
		"2": "rgb(255,128,153)",
		"3": "rgb(255,110,143)",
		"4": "rgb(214,93,138)",
		"5": "rgb(213,119,169)",
		"6": "rgb(255,167,218)"
	},
	yellow: {
		"1": "#be7a3d",
		"2": "#ba872e",
		"3": "#deb040",
		"4": "#fce56f",
		"5": "#f9d857",
		"6": "#fffe96"
	},
	purple: {
		"1": "#905fa8",
		"2": "#bd96eb",
		"3": "#a478df",
		"4": "#935bd4",
		"5": "#9477f6",
		"6": "#ad97f0"
	},
	red: {
		"1": "#7d2b2a",
		"2": "#741516",
		"3": "#923645",
		"4": "#c3413b",
		"5": "#d25453",
		"6": "#ed7172"
	},
	blue: {
		"1": "#184892",
		"2": "#5299f4",
		"3": "#2a6bd8",
		"4": "#6ac3fa",
		"5": "#5299f4",
		"6": "#73fbfd"
	}
};

export const scoringRules: {[key: string]: number} = {
    "0": 0,
    "1": 100,
    "2": 300,
    "3": 600,
    "4": 1000
};

export const blockTypes: BlockTypes = {
	'1': {
		className: "type-1",
		arr: [
			[1, 1, 1, 1]
		],
		innerHTML: `<div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div>`,
	},
	'2': {
		className: "type-2",
		arr: [
			[0, 1, 0],
			[1, 1, 1]
		],
		innerHTML: `<div class="block type-2-1"></div><div class="type-2-2"><div class="block"></div><div class="block"></div><div class="block"></div></div>`,
	},
	'3': {
		className: "type-3",
		arr: [
			[1, 1],
			[1, 1]
		],
		innerHTML: `<div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div>`,
	},
	'4': {
		className: "type-4",
		arr: [
			[1, 0],
			[1, 0],
			[1, 1]
		],
		innerHTML: `<div class="type-4-1"><div class="block"></div><div class="block"></div><div class="block"></div></div><div class="type-4-2"><div class="block"></div></div>`,
	},
	'5': {
		className: "type-5",
		arr: [
			[1, 1, 0],
			[0, 1, 1]
		],
		innerHTML: `<div class="type-5-1"><div class="block"></div><div class="block"></div></div><div class="type-5-2"><div class="block"></div><div class="block"></div></div>`,
	},
	'6': {
		className: "type-6",
		arr: [
			[1, 0],
			[1, 1]
		],
		innerHTML: `<div class="block"></div><div class="type-6-1"><div class="block"></div><div class="block"></div></div>`,	
	}
}

export const arrowData: ArrowData[] = [
	{
		text: '旋转',
		src: require('../assets/images/arrow-up.svg'),
		alt: 'up',
	},
	{
		text: '快速落下',
		src: require('../assets/images/arrow-down.svg'),
		alt: 'down',
	},
	{
		text: '左移',
		src: require('../assets/images/arrow-left.svg'),
		alt: 'left',
	},
	{
		text: '右移',
		src: require('../assets/images/arrow-right.svg'),
		alt: 'right',
	},
];

export const colorBgMap: Map<Color, any> = new Map([
	['yellow', yellowBg],
	['green', greenBg],
	['blue', blueBg],
	['purple', purpleBg],
	['pink', pinkBg],
	['red', redBg],
]);
