import { type PickupData, PickupNet } from "../../shared/pickups";
import { Pickup } from "../entities/pickup";
import { ClientOrchestration } from "./orchestration";

export class PickupPool extends ClientOrchestration<PickupData, Pickup> {
	protected readonly net = PickupNet;

	constructor() {
		super();
		this.register();
	}

	protected draw(d: PickupData): Pickup {
		return new Pickup(d);
	}

	protected erase(p: Pickup): void {
		p.remove();
	}
}
