/// <reference types="@citizenfx/client" />

import { Vector3 } from "../../shared";
import { Pool } from "../../shared/pool-base";

export abstract class ClientPool<T> extends Pool<T> {
	atNetId(netId: number): T | undefined {
		if (!NetworkDoesNetworkIdExist(netId)) return undefined;
		const handle = NetworkGetEntityFromNetworkId(netId);
		return handle !== 0 ? this.wrap(handle) : undefined;
	}

	forEachInStreamRange(fn: (item: T) => void, radius: 424.0) {
		const origin = Vector3.from(GetEntityCoords(PlayerPedId(), false));
		const r2 = radius * radius;

		this.ids().forEach((id) => {
			const item = this.wrap(id);
			if ((item as any).position.distanceToSquared(origin) <= r2) {
				fn(item);
			}
		});
	}
}
