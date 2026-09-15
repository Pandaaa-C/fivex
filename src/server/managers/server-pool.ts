/// <reference types="@citizenfx/server" />
import { Pool } from "../../shared/pool-base";

export abstract class ServerPool<T> extends Pool<T> {
	atNetId(netId: number): T | undefined {
		const handle = NetworkGetEntityFromNetworkId(netId);
		return handle !== 0 ? this.wrap(handle) : undefined;
	}
}
