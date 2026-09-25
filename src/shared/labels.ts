import type { IVector3 } from "./index";
import type { OrchestrationNet } from "./orchestration";

export interface LabelData {
	id: number;
	coords: IVector3;
	text: string;
	color?: { r: number; g: number; b: number; a?: number };
	scale?: number;
	font?: number;
	drawDistance?: number;
}

export const LabelNet: OrchestrationNet = {
	add: "__fx:label:add",
	remove: "__fx:label:remove",
	sync: "__fx:label:sync",
};
