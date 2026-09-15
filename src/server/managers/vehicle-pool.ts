import {Vehicle} from "../../client";
import {Pool} from "../../shared/pool-base";

export class VehiclePool extends Pool<Vehicle> {
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