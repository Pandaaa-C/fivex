/// <reference types="@citizenfx/client" />
import type { PickupData } from "../../shared/pickups";

export class Pickup {
	handle = 0;

	constructor(public readonly data: PickupData) {
		void this.spawn();
	}

	private async spawn(): Promise<void> {
		const model =
			typeof this.data.model === "string"
				? GetHashKey(this.data.model)
				: this.data.model;
		RequestModel(model);
		const deadline = GetGameTimer() + 5000;
		while (!HasModelLoaded(model)) {
			if (GetGameTimer() > deadline) return;
			await new Promise((r) => setTimeout(r, 0));
		}
		this.handle = CreateObject(
			model,
			this.data.coords.x,
			this.data.coords.y,
			this.data.coords.z,
			false,
			false,
			false,
		);
		FreezeEntityPosition(this.handle, true);
		SetEntityCollision(this.handle, false, false);
		SetModelAsNoLongerNeeded(model);
	}

	remove(): void {
		if (this.handle !== 0) DeleteEntity(this.handle);
	}
}
