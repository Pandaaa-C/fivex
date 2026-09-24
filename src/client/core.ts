import { Vector3 } from "../shared";
import { registerBlipHandlers } from "./blips-internal";
import { LocalPlayer } from "./entities/local-player";
import { registerInternalHandlers } from "./internal";
import { ColShapePool } from "./managers/colshape-pool";
import { EventManager } from "./managers/event-manager";
import { GameObjectPool } from "./managers/object-pool";
import { PedPool } from "./managers/ped-pool";
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

	constructor() {
		registerInternalHandlers();
		registerBlipHandlers();
	}
}
