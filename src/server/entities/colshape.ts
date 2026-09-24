import type { ColshapeShape } from "../../shared/colshape";
import type { Player } from "./player";

export interface ColshapeOptions extends ColshapeShape {
	dimension?: number;
	onEnter?: (shape: Colshape, player: Player) => void;
	onExit?: (shape: Colshape, player: Player) => void;
}

export class Colshape {
	readonly inside = new Set<number>();

	constructor(
		public readonly id: number,
		public readonly options: ColshapeOptions,
		private readonly onDestroy: (id: number) => void,
	) {}

	destroy(): void {
		this.onDestroy(this.id);
	}
}
