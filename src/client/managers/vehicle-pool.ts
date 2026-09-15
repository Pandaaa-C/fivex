import {Pool} from "../../shared/pool-base";
import {Vehicle} from "../entities/vehicle";

export class VehiclePool extends Pool<Vehicle> {
    protected ids(): number[] {
        return GetGamePool('CVehicle') as number[];
    }

    protected wrap(id: number): Vehicle {
        return new Vehicle(id);
    }

    at(handle: number) {
        return new Vehicle(handle);
    }
}