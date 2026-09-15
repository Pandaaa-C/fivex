/// <reference types="@citizenfx/server" />
import {IVector3, Vector3} from "../../shared";
import {entityState} from "../internal/state";

export class Entity {
    constructor(public readonly handle: number) {
    }

    get netId(): number {
        return NetworkGetNetworkIdFromEntity(this.handle);
    }

    get type(): number {
        return GetEntityType(this.handle);
    }

    get position(): Vector3 {
        return Vector3.from(GetEntityCoords(this.handle));
    }

    set position(v: IVector3) {
        SetEntityCoords(this.handle, v.x, v.y, v.z, false, false, false, false);
    }

    get rotation(): Vector3 {
        return Vector3.from(GetEntityRotation(this.handle));
    }

    set rotation(v: IVector3) {
        SetEntityRotation(this.handle, v.x, v.y, v.z, 2, true);
    }

    get heading(): number {
        return GetEntityHeading(this.handle);
    }

    get health(): number {
        return GetEntityHealth(this.handle);
    }

    set heading(v: number) {
        SetEntityHeading(this.handle, v);
    }

    get dimension(): number {
        return GetEntityRoutingBucket(this.handle);
    }

    set dimension(bucket: number) {
        SetEntityRoutingBucket(this.handle, bucket);
    }

    getVariable<T = unknown>(key: string): T | undefined {
        return entityState(this.handle)[key] as T | undefined;
    }

    setVariable(key: string, value: unknown): void {
        entityState(this.handle).set(key, value, true);
    }

    distance(to: Entity | IVector3): number {
        const p = to instanceof Entity ? to.position : to;
        return this.position.distanceTo(Vector3.from(p));
    }

    distanceSquared(to: Entity | IVector3): number {
        const p = to instanceof Entity ? to.position : to;
        return this.position.distanceToSquared(Vector3.from(p));
    }

    destroy(): void {
        DeleteEntity(this.handle);
    }
}