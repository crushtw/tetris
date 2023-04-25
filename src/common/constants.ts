import {BlockColor} from "./interface";

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

export const allColor = {
    green: {
        1: "#3f8a87",
        2: "#2f6e59",
        3: "#7bc9b0",
        4: "#4eac84",
        5: "#83d77d",
        6: "#5c9943"
    },
    pink: {
        1: "rgb(254,156,171)",
        2: "rgb(255,128,153)",
        3: "rgb(255,110,143)",
        4: "rgb(214,93,138)",
        5: "rgb(213,119,169)",
        6: "rgb(255,167,218)"
    },
    yellow: {
        1: "#be7a3d",
        2: "#ba872e",
        3: "#deb040",
        4: "#f9d857",
        5: "#fce56f",
        6: "#fffe96"
    },
    purple: {
        1: "#905fa8",
        2: "#a478df",
        3: "#ad97f0",
        4: "#935bd4",
        5: "#bd96eb",
        6: "#9477f6"
    },
    red: {
        1: "#7d2b2a",
        2: "#741516",
        3: "#923645",
        4: "#c3413b",
        5: "#d25453",
        6: "#ed7172"
    },
    blue: {
        1: "#184892",
        2: "#5299f4",
        3: "#2a6bd8",
        4: "#6ac3fa",
        5: "#5299f4",
        6: "#73fbfd"
    }
}

export const scoringRules = {
    0: 0,
    1: 100,
    2: 300,
    3: 600,
    4: 1000
};

// 可视化block数组
const arrRow: number[] = (new Array(16)).fill(0);
export const arr: number[][] = (new Array(24)).fill(0).map(_ => [...arrRow]);
