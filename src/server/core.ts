import { Vector3 } from "../shared";
import { BlipPool } from "./managers/blip-pool";
import { ColshapePool } from "./managers/colshape-pool";
import { EventManager } from "./managers/event-manager";
import { ObjectPool } from "./managers/object-pool";
import { PickupPool } from "./managers/pickup-pool";
import { PlayerPool } from "./managers/player-pool";
import { VehiclePool } from "./managers/vehicle-pool";

export class Core {
	readonly events = new EventManager();
	readonly Vector3 = Vector3;

	readonly players = new PlayerPool();
	readonly vehicles = new VehiclePool();
	readonly objects = new ObjectPool();
	readonly colshapes = new ColshapePool();
	readonly blips = new BlipPool();
	readonly pickups = new PickupPool(this.colshapes);
}
