/// <reference types="@citizenfx/client" />

import {IVector3, Vector3} from "../../shared";

export class Entity {
    constructor(public readonly handle: number) {
    }

    get exists(): boolean {
        return DoesEntityExist(this.handle);
    }

    get model(): number {
        return GetEntityModel(this.handle);
    }

    get isNetworked(): boolean {
        return NetworkGetEntityIsNetworked(this.handle);
    }

    get netId(): number {
        return NetworkGetNetworkIdFromEntity(this.handle);
    }

    get position(): Vector3 {
        return Vector3.from(GetEntityCoords(this.handle, false));
    }

    set position(v: IVector3) {
        SetEntityCoords(this.handle, v.x, v.y, v.z, false, false, false, false);
    }

    get rotation(): Vector3 {
        return Vector3.from(GetEntityRotation(this.handle, 2));
    }

    set rotation(v: IVector3) {
        SetEntityRotation(this.handle, v.x, v.y, v.z, 2, true);
    }

    get heading(): number {
        return GetEntityHeading(this.handle);
    }

    set heading(v: number) {
        SetEntityHeading(this.handle, v);
    }

    get health(): number {
        return GetEntityHealth(this.handle);
    }

    set health(v: number) {
        SetEntityHealth(this.handle, v);
    }

    freeze(toggle: boolean): void {
        FreezeEntityPosition(this.handle, toggle);
    }

    setCollision(toggle: boolean): void {
        SetEntityCollision(this.handle, toggle, true);
    }

    setAlpha(alpha: number): void {
        SetEntityAlpha(this.handle, alpha, false);
    }

    resetAlpha(): void {
        ResetEntityAlpha(this.handle);
    }

    distanceTo(other: Entity | IVector3): number {
        const p = other instanceof Entity ? other.position : other;
        return this.position.distanceTo(Vector3.from(p));
    }

    delete(): void {
        DeleteEntity(this.handle);
    }
}