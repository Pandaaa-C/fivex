import type { IVector3 } from "../../shared";
import type { ColshapeKind } from "../../shared/colshape";

export interface ColshapeOptions {
	kind: ColshapeKind;
	center: IVector3;
	radius?: number;
	size?: IVector3;
	onEnter?: (shape: Colshape) => void;
	onExit?: (shape: Colshape) => void;
}

export class Colshape {
	isInside = false;

	constructor(
		public readonly id: number,
		public readonly options: ColshapeOptions,
		private readonly onDestroy: (id: number) => void,
	) {}

	contains(position: IVector3): boolean {
		const center = this.options.center;
		switch (this.options.kind) {
			case "sphere": {
				const radius = this.options.radius ?? 1;
				const dx = position.x - center.x,
					dy = position.y - center.y,
					dz = position.z - center.z;
				return dx * dx + dy * dy + dz * dz <= radius * radius;
			}
			case "circle": {
				const radius = this.options.radius ?? 1;
				const dx = position.x - center.x,
					dy = position.y - center.y;
				return dx * dx + dy * dy <= radius * radius;
			}
			case "box": {
				const size = this.options.size ?? { x: 1, y: 1, z: 1 };
				return (
					Math.abs(position.x - center.x) <= size.x / 2 &&
					Math.abs(position.y - center.y) <= size.y / 2 &&
					Math.abs(position.z - center.z) <= size.z / 2
				);
			}
		}
	}

	destroy(): void {
		this.onDestroy(this.id);
	}
}
