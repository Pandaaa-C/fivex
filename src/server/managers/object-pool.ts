import { type IVector3, Vector3 } from "../../shared";
import { GameObject } from "../entities/object";
import { ServerPool } from "./server-pool";

export class ObjectPool extends ServerPool<GameObject> {
	protected ids(): number[] {
		return GetAllObjects() as number[];
	}

	protected wrap(id: number): GameObject {
		return new GameObject(id);
	}

	at(handle: number) {
		return new GameObject(handle);
	}

	getClosest(to: IVector3): GameObject | undefined {
		return this.getClosestBy(to, (p) => p.position);
	}

	getInRange(to: IVector3, radius: number): GameObject[] {
		const origin = Vector3.from(to);
		const r2 = radius * radius;

		return this.toArray().filter(
			(v) => v.position.distanceToSquared(origin) <= r2,
		);
	}

	getByModel(model: string | number): GameObject[] {
		const hash = typeof model === "string" ? GetHashKey(model) : model;
		return this.toArray().filter((v) => v.model === hash);
	}

	new(
		model: string | number,
		position: IVector3,
		isNetwork: boolean = true,
		netMissionEntity: boolean = true,
		doorFlag: boolean = true,
	): GameObject | undefined {
		const hash = typeof model === "string" ? GetHashKey(model) : model;
		const handle = CreateObject(
			hash,
			position.x,
			position.y,
			position.z,
			isNetwork,
			netMissionEntity,
			doorFlag,
		);

		return handle !== 0 ? new GameObject(handle) : undefined;
	}
}
