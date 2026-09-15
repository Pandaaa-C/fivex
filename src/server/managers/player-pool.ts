import { Player } from "../entities/player";
import { ServerPool } from "./server-pool";

export class PlayerPool extends ServerPool<Player> {
	protected ids(): number[] {
		return (getPlayers() as string[]).map(Number);
	}

	protected wrap(id: number): Player {
		return new Player(id);
	}

	at(source: number): Player {
		return new Player(source);
	}

	call(name: string, ...args: any[]): void {
		emitNet(name, -1, ...args);
	}
}
