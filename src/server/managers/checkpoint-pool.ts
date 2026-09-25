import { type CheckpointData, CheckpointNet } from "../../shared/checkpoints";
import { Checkpoint } from "../entities/checkpoint";
import type { Player } from "../entities/player";
import type { ColshapePool } from "./colshape-pool";
import { ServerOrchestration } from "./orchestration";

interface CheckpointOptions extends Omit<CheckpointData, "id"> {
	onEnter?: (player: Player) => void;
	removeOnEnter?: boolean;
}

export class CheckpointPool extends ServerOrchestration<
	CheckpointData,
	Checkpoint
> {
	protected readonly net = CheckpointNet;

	constructor(private readonly colshapes: ColshapePool) {
		super();
	}

	protected wrap(
		target: number,
		data: CheckpointData,
		_onChange: () => void,
		onRemove: () => void,
	): Checkpoint {
		return new Checkpoint(target, data, onRemove);
	}

	create(options: CheckpointOptions): Checkpoint {
		const { onEnter, removeOnEnter = false, ...data } = options;

		const checkpoint = this.spawn(-1, data);
		checkpoint.onEnter = onEnter;

		const shape = this.colshapes.create({
			kind: "sphere",
			center: data.coords,
			radius: data.radius ?? 3,
			onEnter: (_s, player) => {
				checkpoint.onEnter?.(player);
				if (removeOnEnter) checkpoint.remove();
			},
		});
		checkpoint.attachColshape(shape);

		return checkpoint;
	}
}
