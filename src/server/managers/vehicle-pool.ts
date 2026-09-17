import { type IVector3, Vector3 } from "../../shared";
import { Vehicle } from "../entities/vehicle";
import { ServerPool } from "./server-pool";

export class VehiclePool extends ServerPool<Vehicle> {
	protected ids(): number[] {
		return GetAllVehicles() as number[];
	}

	protected wrap(id: number): Vehicle {
		return new Vehicle(id);
	}

	at(handle: number) {
		return new Vehicle(handle);
	}

	getClosest(to: IVector3): Vehicle | undefined {
		return this.getClosestBy(to, (v) => v.position);
	}

	getInRange(to: IVector3, radius: number): Vehicle[] {
		const origin = Vector3.from(to);
		const r2 = radius * radius;

		return this.toArray().filter(
			(v) => v.position.distanceToSquared(origin) <= r2,
		);
	}

	getByModel(model: string | number): Vehicle[] {
		const hash = typeof model === "string" ? GetHashKey(model) : model;
		return this.toArray().filter((v) => v.model === hash);
	}

	new(
		hash: number | string,
		position: IVector3,
		heading: number,
		isNetwork: boolean = true,
		netMissionEntity: boolean = true,
	): Vehicle | null {
		const _hash = typeof hash === "string" ? GetHashKey(hash) : hash;
		const handle = CreateVehicle(
			_hash,
			position.x,
			position.y,
			position.z,
			heading,
			isNetwork,
			netMissionEntity,
		);

		return handle !== 0 ? new Vehicle(handle) : null;
	}
}
