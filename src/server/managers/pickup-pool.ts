import { type PickupData, PickupNet } from "../../shared/pickups";
import { Pickup } from "../entities/pickup";
import type { Player } from "../entities/player";
import type { ColshapePool } from "./colshape-pool";
import { ServerOrchestration } from "./orchestration";

interface PickupOptions extends Omit<PickupData, "id"> {
	onCollect?: (player: Player) => void;
	removeOnCollect?: boolean;
}

export class PickupPool extends ServerOrchestration<PickupData, Pickup> {
	protected readonly net = PickupNet;

	constructor(private readonly colshapes: ColshapePool) {
		super();
	}

	protected wrap(
		target: number,
		data: PickupData,
		onRemove: () => void,
	): Pickup {
		return new Pickup(target, data, onRemove);
	}

	create(options: PickupOptions): Pickup {
		const { onCollect, removeOnCollect = true, ...data } = options;

		const pickup = this.spawn(-1, data);
		pickup.onCollect = onCollect;

		const shape = this.colshapes.create({
			kind: "sphere",
			center: data.coords,
			radius: data.radius ?? 1.5,
			onEnter: (_s, player) => {
				pickup.onCollect?.(player);
				if (removeOnCollect) pickup.remove();
			},
		});
		pickup.attachColshape(shape);

		return pickup;
	}
}
