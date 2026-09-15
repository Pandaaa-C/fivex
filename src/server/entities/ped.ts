import { Entity } from "./entity";

export class Ped extends Entity {
	get armour(): number {
		return GetPedArmour(this.handle);
	}
}
