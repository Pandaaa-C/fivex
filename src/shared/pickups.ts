import type { IVector3 } from "./index";
import type { OrchestrationNet } from "./orchestration";

export interface PickupData {
	id: number;
	coords: IVector3;
	model: number | string;
	radius?: number;
}

export const PickupNet: OrchestrationNet = {
	add: "__fx:pickup:add",
	remove: "__fx:pickup:remove",
	sync: "__fx:pickup:sync",
};
