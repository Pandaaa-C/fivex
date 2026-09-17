import { Entity } from "./entity";

export class Ped extends Entity {
	get model(): number {
		return GetEntityModel(this.handle);
	}

	get armour(): number {
		return GetPedArmour(this.handle);
	}
}
