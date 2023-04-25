export type Color = 'green' | 'yellow' | 'red' | 'purple' | 'blue' | 'pink';
export interface BlockColor {
	text: Color,
	borderColor: string,
	backgroundColor?: string,
}

export type StatusType = 'start' | 'doing' | 'end';
