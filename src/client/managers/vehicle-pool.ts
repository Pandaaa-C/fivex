import { type IVector3, Vector3 } from "../../shared";
import { Vehicle } from "../entities/vehicle";
import { ClientPool } from "./client-pool";

export class VehiclePool extends ClientPool<Vehicle> {
	protected ids(): number[] {
		return GetGamePool("CVehicle") as number[];
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

	async new(
		model: string | number,
		position: IVector3,
	): Promise<Vehicle | null> {
		const hash = typeof model === "string" ? GetHashKey(model) : model;

		RequestModel(hash);
		while (!HasModelLoaded(hash))
			await new Promise((resolve) => setTimeout(resolve, 0));

		const handle = CreateVehicle(
			hash,
			position.x,
			position.y,
			position.z,
			0,
			false,
			false,
		);
		return handle !== 0 ? new Vehicle(handle) : null;
	}
}
