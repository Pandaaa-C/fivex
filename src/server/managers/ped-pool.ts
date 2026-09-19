import { type IVector3, Vector3 } from "../../shared";
import { Ped } from "../entities/ped";
import { ServerPool } from "./server-pool";

export class PedPool extends ServerPool<Ped> {
	protected ids(): number[] {
		return GetAllPeds() as number[];
	}

	protected wrap(id: number): Ped {
		return new Ped(id);
	}

	at(handle: number) {
		return new Ped(handle);
	}

	getClosest(to: IVector3): Ped | undefined {
		return this.getClosestBy(to, (p) => p.position);
	}

	getInRange(to: IVector3, radius: number): Ped[] {
		const origin = Vector3.from(to);
		const r2 = radius * radius;

		return this.toArray().filter(
			(v) => v.position.distanceToSquared(origin) <= r2,
		);
	}

	getByModel(model: string | number): Ped[] {
		const hash = typeof model === "string" ? GetHashKey(model) : model;
		return this.toArray().filter((v) => v.model === hash);
	}

	new(
		model: string | number,
		position: IVector3,
		heading: number,
		isNetwork: boolean = true,
		bScriptHostPed: boolean = true,
	) {
		const hash = typeof model === "string" ? GetHashKey(model) : model;
		const handle = CreatePed(
			0,
			hash,
			position.x,
			position.y,
			position.z,
			heading,
			isNetwork,
			bScriptHostPed,
		);
		return handle !== 0 ? new Ped(handle) : undefined;
	}
}
