import type { CheckpointData } from "../../shared/checkpoints";
import type { Orchestrated } from "../../shared/orchestration";
import type { Colshape } from "./colshape";
import type { Player } from "./player";

export class Checkpoint implements Orchestrated<CheckpointData> {
	onEnter?: (player: Player) => void;
	private colshape?: Colshape;

	constructor(
		public readonly target: number,
		public readonly data: CheckpointData,
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
