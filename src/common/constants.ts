import {ArrowData, BlockColor, BlockTypes} from "./interface";

export const blockColor: BlockColor[] = [
	{
		text: 'green',
		borderColor: 'green',
		backgroundColor: '#7bc9b0',
	},
	{
		text: 'pink',
		borderColor: 'pink',
		backgroundColor: '',
	},
	{
		text: 'yellow',
		borderColor: 'yellow',
		backgroundColor: '',
	},
	{
		text: 'red',
		borderColor: 'red',
		backgroundColor: '',
	},
	{
		text: 'purple',
		borderColor: 'rgb(57, 6, 151)',
		backgroundColor: '',
	},
	{
		text: 'blue',
		borderColor: 'blue',
		backgroundColor: '',
	},
];

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
		"4": "#f9d857",
		"5": "#fce56f",
		"6": "#fffe96"
	},
	purple: {
		"1": "#905fa8",
		"2": "#a478df",
		"3": "#ad97f0",
		"4": "#935bd4",
		"5": "#bd96eb",
		"6": "#9477f6"
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
]