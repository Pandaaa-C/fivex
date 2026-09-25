/// <reference types="@citizenfx/client" />
import type { CheckpointData } from "../../shared/checkpoints";

export class Checkpoint {
	readonly handle: number;

	constructor(public readonly data: CheckpointData) {
		const c = data.coords;
		const next = data.nextCoords ?? c;
		const col = data.color ?? { r: 255, g: 255, b: 0 };
		this.handle = CreateCheckpoint(
			data.type ?? 45,
			c.x,
			c.y,
			c.z,
			next.x,
			next.y,
			next.z,
			data.radius ?? 3,
			col.r,
			col.g,
			col.b,
			col.a ?? 100,
			0,
		);
	}

	remove(): void {
		DeleteCheckpoint(this.handle);
	}
}
