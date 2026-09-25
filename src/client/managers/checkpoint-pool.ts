import { type CheckpointData, CheckpointNet } from "../../shared/checkpoints";
import { Checkpoint } from "../entities/checkpoint";
import { ClientOrchestration } from "./orchestration";

export class CheckpointPool extends ClientOrchestration<
	CheckpointData,
	Checkpoint
> {
	protected readonly net = CheckpointNet;

	constructor() {
		super();
		this.register();
	}

	protected draw(d: CheckpointData): Checkpoint {
		return new Checkpoint(d);
	}

	protected erase(c: Checkpoint): void {
		c.remove();
	}
}
