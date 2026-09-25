import type { IVector3 } from "./index";

export type ColshapeKind = "sphere" | "circle" | "box";

export interface ColshapeShape {
	kind: ColshapeKind;
	center: IVector3;
	radius?: number;
	size?: IVector3;
}

export function isInsideShape(shape: ColshapeShape, p: IVector3): boolean {
	const c = shape.center;
	switch (shape.kind) {
		case "sphere": {
			const r = shape.radius ?? 1;
			const dx = p.x - c.x,
				dy = p.y - c.y,
				dz = p.z - c.z;
			return dx * dx + dy * dy + dz * dz <= r * r;
		}
		case "circle": {
			const r = shape.radius ?? 1;
			const dx = p.x - c.x,
				dy = p.y - c.y;
			return dx * dx + dy * dy <= r * r; // ignores z
		}
		case "box": {
			const s = shape.size ?? { x: 1, y: 1, z: 1 };
			return (
				Math.abs(p.x - c.x) <= s.x / 2 &&
				Math.abs(p.y - c.y) <= s.y / 2 &&
				Math.abs(p.z - c.z) <= s.z / 2
			);
		}
	}
}
