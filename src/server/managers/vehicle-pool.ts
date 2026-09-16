import {Vehicle} from "../entities/vehicle";
import {ServerPool} from "./server-pool";
import {IVector3} from "../../shared";

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

    new(
        hash: number | string,
        position: IVector3,
        heading: number,
        isNetwork: boolean = true,
        netMissionEntity: boolean = true,
    ): Vehicle | null {
        const _hash = typeof hash === "string" ? GetHashKey(hash) : hash;
        const handle = CreateVehicle(_hash, position.x, position.y, position.z, heading, isNetwork, netMissionEntity);
		
        return handle !== 0 ? new Vehicle(handle) : null;
    }
}
