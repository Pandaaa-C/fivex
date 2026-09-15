/// <reference types="@citizenfx/client" />

export class RemotePlayer {
    constructor(public readonly id: number) {}

    get serverId(): number {
        return GetPlayerServerId(this.id);
    }

    get name(): string {
        return GetPlayerName(this.id);
    }

    get pedHandle(): number {
        return GetPlayerPed(this.id);
    }

    get isLocal(): boolean {
        return this.id === PlayerId();
    }
}
