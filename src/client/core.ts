import { Vector3 } from "../shared";
import { LocalPlayer } from "./entities/local-player";
import { registerInternalHandlers } from "./internal";
import { BlipPool } from "./managers/blip-pool";
import { ColShapePool } from "./managers/colshape-pool";
import { EventManager } from "./managers/event-manager";
import { GameObjectPool } from "./managers/object-pool";
import { PedPool } from "./managers/ped-pool";
import { PickupPool } from "./managers/pickup-pool";
import { ClientPlayerPool } from "./managers/player-pool";
import { VehiclePool } from "./managers/vehicle-pool";

export class Core {
	readonly events = new EventManager();
	readonly player = new LocalPlayer();
	readonly Vector3 = Vector3;

	// Pools
	readonly players = new ClientPlayerPool();
	readonly vehicles = new VehiclePool();
	readonly peds = new PedPool();
	readonly objects = new GameObjectPool();
	readonly colshapes = new ColShapePool();
	readonly blips = new BlipPool();
	readonly pickups = new PickupPool();

	constructor() {
		registerInternalHandlers();
	}
}
