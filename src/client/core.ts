import { BlipManager } from "../server/blips";
import { Vector3 } from "../shared";
import { registerBlipHandlers } from "./blips-internal";
import { LocalPlayer } from "./entities/local-player";
import { registerInternalHandlers } from "./internal";
import { EventManager } from "./managers/event-manager";
import {ClientPlayerPool} from "./managers/player-pool";
import {PedPool} from "./managers/ped-pool";
import {VehiclePool} from "./managers/vehicle-pool";

export class Core {
	readonly events = new EventManager();
	readonly player = new LocalPlayer();
	readonly Vector3 = Vector3;
	readonly blips = new BlipManager();

	// Pools
	readonly players = new ClientPlayerPool();
	readonly vehicles = new VehiclePool()
	readonly peds = new PedPool();

	constructor() {
		registerInternalHandlers();
		registerBlipHandlers();
	}
}
