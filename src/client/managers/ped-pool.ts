import { Ped } from "../entities/ped";
import { ClientPool } from "./client-pool";

export class PedPool extends ClientPool<Ped> {
	protected ids(): number[] {
		return GetGamePool("CPed") as number[];
	}

	protected wrap(id: number): Ped {
		return new Ped(id);
	}

	at(handle: number) {
		return new Ped(handle);
	}
}
