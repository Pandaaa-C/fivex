import { Vector3 } from "../../shared";
import { Colshape, type ColshapeOptions } from "../entities/colshape";
import { ClientPool } from "./client-pool";

export class ColShapePool extends ClientPool<Colshape> {
	private shapes = new Map<number, Colshape>();
	private nextId = 1;
	private tick: number | null = null;

	protected ids(): number[] {
		return [...this.shapes.keys()];
	}

	protected wrap(id: number): Colshape {
		const shape = this.shapes.get(id);
		if (!shape) throw new Error(`[fx] colshape ${id} not found in pool`);
		return shape;
	}

	at(id: number): Colshape | undefined {
		return this.shapes.get(id);
	}

	create(options: ColshapeOptions): Colshape {
		const shape = new Colshape(this.nextId++, options, (id) => this.remove(id));
		this.shapes.set(shape.id, shape);
		this.ensureTick();
		return shape;
	}

	remove(id: number): void {
		this.shapes.delete(id);

		if (this.shapes.size === 0 && this.tick !== null) {
			clearTick(this.tick);
			this.tick = null;
		}
	}

	private ensureTick(): void {
		if (this.tick !== null) return;

		this.tick = setTick(() => {
			const position = Vector3.from(GetEntityCoords(PlayerPedId(), false));
			for (const shape of this.shapes.values()) {
				const inside = shape.contains(position);
				if (inside && !shape.isInside) {
					shape.isInside = true;
					shape.options.onEnter?.(shape);
				} else if (!inside && shape.isInside) {
					shape.isInside = false;
					shape.options.onExit?.(shape);
				}
			}
		});
	}
}
