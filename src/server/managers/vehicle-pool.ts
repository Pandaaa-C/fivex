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
}
