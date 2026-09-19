import { Entity } from "./entity";

export class GameObject extends Entity {
	get model() {
		return GetEntityModel(this.handle);
	}
}
