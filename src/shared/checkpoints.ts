import type { IVector3 } from "./index";
import type { OrchestrationNet } from "./orchestration";

export interface CheckpointData {
	id: number;
	coords: IVector3;
	radius?: number;
	type?: number;
	color?: { r: number; g: number; b: number; a?: number };
	nextCoords?: IVector3;
}

export const CheckpointNet: OrchestrationNet = {
	add: "__fx:checkpoint:add",
	remove: "__fx:checkpoint:remove",
	sync: "__fx:checkpoint:sync",
};
