import type { IVector3 } from "./index";
import type { OrchestrationNet } from "./orchestration";

export interface MarkerData {
	id: number;
	type: number;
	coords: IVector3;
	color: { r: number; g: number; b: number };
	scale?: IVector3;
	direction?: IVector3;
	rotation?: IVector3;
	alpha?: number;
	bobUpAndDown?: boolean;
	faceCamera?: boolean;
	rotationOrder?: number;
}

export const MarkerNet: OrchestrationNet = {
	add: "__fx:marker:add",
	remove: "__fx:marker:remove",
	sync: "__fx:marker:sync",
};
