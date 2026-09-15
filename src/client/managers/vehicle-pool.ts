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
}
