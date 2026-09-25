/// <reference types="@citizenfx/client" />
import type { MarkerData } from "../../shared/markers";

export class Marker {
	constructor(public readonly data: MarkerData) {}

	render(): void {
		const d = this.data;
		const s = d.scale ?? { x: 1, y: 1, z: 1 };
		const dir = d.direction ?? { x: 0, y: 0, z: 0 };
		const rot = d.rotation ?? { x: 0, y: 0, z: 0 };
		DrawMarker(
			d.type,
			d.coords.x,
			d.coords.y,
			d.coords.z,
			dir.x,
			dir.y,
			dir.z,
			rot.x,
			rot.y,
			rot.z,
			s.x,
			s.y,
			s.z,
			d.color.r,
			d.color.g,
			d.color.b,
			d.alpha ?? 100,
			d.bobUpAndDown ?? false,
			d.faceCamera ?? false,
			d.rotationOrder ?? 2,
			false,
			"",
			"",
			false,
		);
	}
}
