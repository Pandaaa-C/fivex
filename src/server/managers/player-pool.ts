import { Player } from "../entities/player";
import {Pool} from "../../shared/pool-base";

export class PlayerPool extends Pool<Player>{
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
