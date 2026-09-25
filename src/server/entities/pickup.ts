import type { Orchestrated } from "../../shared/orchestration";
import type { PickupData } from "../../shared/pickups";
import type { Colshape } from "./colshape";
import type { Player } from "./player";

export class Pickup implements Orchestrated<PickupData> {
	onCollect?: (player: Player) => void;
	private colshape?: Colshape;

	constructor(
		public readonly target: number,
		public readonly data: PickupData,
		private readonly baseRemove: () => void,
	) {}

	get id(): number {
		return this.data.id;
	}

	attachColshape(shape: Colshape): void {
		this.colshape = shape;
	}

	remove(): void {
		this.colshape?.destroy();
		this.baseRemove();
	}
}
