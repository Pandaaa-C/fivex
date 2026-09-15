/// <reference types="@citizenfx/client" />

import type { IVector3 } from "../../shared";
import { Entity } from "./entity";

export class GameObject extends Entity {
	get hasBeenBroken(): boolean {
		return HasObjectBeenBroken(this.handle);
	}

	get isVisible(): boolean {
		return IsObjectVisible(this.handle);
	}

	markForDeletion(): void {
		MarkObjectForDeletion(this.handle);
	}

	placeOnGroundProperly(): void {
		PlaceObjectOnGroundProperly(this.handle);
	}

	placeOnGroundOrObjectProperly(): void {
		PlaceObjectOnGroundOrObjectProperly(this.handle);
	}

	setActivatePhysicsAsSoonAsItIsUnfrozen(toggle: boolean): void {
		SetActivateObjectPhysicsAsSoonAsItIsUnfrozen(this.handle, toggle);
	}

	setPhysicsParams(
		mass: number,
		gravityFactor: number,
		linearC: number,
		linearV: number,
		linearV2: number,
		angularC: number,
		angularV: number,
		angularV2: number,
		p9: number,
		maxAngSpeed: number,
		buoyancyFactor: number,
	): void {
		SetObjectPhysicsParams(
			this.handle,
			mass,
			gravityFactor,
			linearC,
			linearV,
			linearV2,
			angularC,
			angularV,
			angularV2,
			p9,
			maxAngSpeed,
			buoyancyFactor,
		);
	}

	setTargetable(toggle: boolean): void {
		SetObjectTargettable(this.handle, toggle);
	}

	slide(to: IVector3, speed: IVector3, collision: boolean): boolean {
		return SlideObject(
			this.handle,
			to.x,
			to.y,
			to.z,
			speed.x,
			speed.y,
			speed.z,
			collision,
		);
	}
}
