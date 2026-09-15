/// <reference types="@citizenfx/client" />
import { Pool } from "../../shared/pool-base";

export abstract class ClientPool<T> extends Pool<T> {
	atNetId(netId: number): T | undefined {
		if (!NetworkDoesNetworkIdExist(netId)) return undefined;
		const handle = NetworkGetEntityFromNetworkId(netId);
		return handle !== 0 ? this.wrap(handle) : undefined;
	}
}
