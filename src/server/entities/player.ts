import {IVector3, Net, Vector3} from "../../shared";
import {playerState} from "../internal/state";
import {serverRpc} from "../managers/rpc";
import {Ped} from "./ped";

export class Player {
    constructor(public readonly source: number) {
    }

    get name(): string {
        return GetPlayerName(String(this.source));
    }

    get ped(): Ped {
        return new Ped(GetPlayerPed(String(this.source)));
    }

    get position(): Vector3 {
        return this.ped.position;
    }

    get rotation(): Vector3 {
        return this.ped.rotation;
    }

    get heading(): number {
        return this.ped.heading;
    }

    get health(): number {
        return this.ped.health;
    }

    get armour(): number {
        return this.ped.armour;
    }

    get identifiers(): Record<string, string> {
        const out: Record<string, string> = {};
        const count = GetNumPlayerIdentifiers(String(this.source));

        for (let i = 0; i < count; i++) {
            const id = GetPlayerIdentifier(String(this.source), i);
            const idx = id.indexOf(":");

            if (idx !== -1) out[id.slice(0, idx)] = id.slice(idx + 1);
        }

        return out;
    }

    getIdentifier(prefix: string): string | undefined {
        const key = prefix.endsWith(":") ? prefix.slice(0, -1) : prefix;
        return this.identifiers[key];
    }

    get dimension(): number {
        return GetPlayerRoutingBucket(String(this.source));
    }

    set dimension(bucket: number) {
        SetPlayerRoutingBucket(String(this.source), bucket);
    }

    getVariable<T = unknown>(key: string): T | undefined {
        return playerState(String(this.source))[key] as T | undefined;
    }

    setVariable(key: string, value: unknown): void {
        playerState(String(this.source)).set(key, value, true);
    }

    setHealth(value: number): void {
        emitNet(Net.setHealth, this.source, value);
    }

    setArmour(value: number): void {
        emitNet(Net.setArmour, this.source, value);
    }

    setPosition(v: IVector3): void {
        emitNet(Net.setPosition, this.source, v.x, v.y, v.z);
    }

    setRotation(v: IVector3): void {
        emitNet(Net.setRotation, this.source, v.x, v.y, v.z);
    }

    call(name: string, ...args: any[]): void {
        emitNet(name, this.source, ...args);
    }

    callProc<T = unknown>(name: string, ...args: unknown[]): Promise<T> {
        return serverRpc.call<T>(this.source, name, args);
    }

    drop(reason: string): void {
        DropPlayer(String(this.source), reason);
    }
}