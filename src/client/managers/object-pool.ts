import {Pool} from "../../shared/pool-base";
import {GameObject} from "../entities/object";
import {IVector3, Vector3} from "../../shared";

export class GameObjectPool extends Pool<Object> {
    protected ids(): number[] {
        return GetGamePool('CObject') as number[];
    }

    protected wrap(id: number): Object {
        return new GameObject(id);
    }

    at(handle: number) {
        return new GameObject(handle);
    }

    async new(model: string | number, position: IVector3, networked = false): Promise<GameObject | null> {
        const hash = typeof model === "string" ? GetHashKey(model) : model;

        RequestModel(hash);
        const deadline = GetGameTimer() + 5000;
        while (!HasModelLoaded(hash)) {
            if (GetGameTimer() > deadline) return null;
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        const handle = CreateObject(hash, position.x, position.y, position.z, networked, false, false);
        SetModelAsNoLongerNeeded(hash);

        return handle !== 0 ? new GameObject(handle) : null;
    }
}