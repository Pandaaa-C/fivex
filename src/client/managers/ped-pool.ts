import {Pool} from "../../shared/pool-base";
import {Ped} from "../entities/ped";

export class PedPool extends Pool<Ped> {
    protected ids(): number[] {
        return GetGamePool('CPed') as number[];
    }

    protected wrap(id: number): Ped {
        return new Ped(id);
    }

    at(handle: number) {
        return new Ped(handle);
    }
}