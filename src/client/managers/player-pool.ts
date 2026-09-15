import { RemotePlayer } from "../entities/remote-player";
import { ClientPool } from "./client-pool";

export class ClientPlayerPool extends ClientPool<RemotePlayer> {
	protected ids(): number[] {
		return GetActivePlayers() as number[];
	}

	protected wrap(id: number): RemotePlayer {
		return new RemotePlayer(id);
	}

	at(index: number): RemotePlayer {
		return new RemotePlayer(index);
	}

	atServerId(index: number): RemotePlayer | undefined {
		return this.find((p) => p.serverId === index);
	}
}
