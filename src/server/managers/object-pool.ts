import {ServerPool} from "./server-pool";
import {GameObject} from "../entities/object";
import {IVector3} from "../../shared";

export class ObjectPool extends ServerPool<GameObject> {
    protected ids(): number[] {
        return GetAllObjects() as number[];
    }

    protected wrap(id: number): GameObject {
        return new GameObject(id);
    }

    at(handle: number) {
        return new GameObject(handle);
    }

    new(model: string | number, position: IVector3, isNetwork: boolean = true, netMissionEntity: boolean = true, doorFlag: boolean = true): GameObject | undefined {
        const hash = typeof model === "string" ? GetHashKey(model) : model;
        const handle = CreateObject(hash, position.x, position.y, position.z, isNetwork, netMissionEntity, doorFlag);

        return handle !== 0 ? new GameObject(handle) : undefined;
    }
}