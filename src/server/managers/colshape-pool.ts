import { Vector3 } from "../../shared";
import { isInsideShape } from "../../shared/colshape";
import { Pool } from "../../shared/pool-base";
import { Colshape, type ColshapeOptions } from "../entities/colshape";
import { Player } from "../entities/player";

export class ColshapePool extends Pool<Colshape> {
	private shapes = new Map<number, Colshape>();
	private nextId = 1;
	private interval: ReturnType<typeof setInterval> | null = null;
	private readonly rateMs = 300;

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
		this.ensureLoop();
		return shape;
	}

	remove(id: number): void {
		this.shapes.delete(id);
		if (this.shapes.size === 0 && this.interval !== null) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	handleDropped(source: number): void {
		for (const shape of this.shapes.values()) {
			if (shape.inside.delete(source)) {
				shape.options.onExit?.(shape, new Player(source));
			}
		}
	}

	private ensureLoop(): void {
		if (this.interval !== null) return;
		this.interval = setInterval(() => this.check(), this.rateMs);
	}

	private check(): void {
		const players = (getPlayers() as string[]).map(Number);
		for (const shape of this.shapes.values()) {
			for (const src of players) {
				const ped = GetPlayerPed(String(src));
				if (ped === 0) continue;

				if (
					shape.options.dimension !== undefined &&
					GetPlayerRoutingBucket(String(src)) !== shape.options.dimension
				) {
					if (shape.inside.delete(src))
						shape.options.onExit?.(shape, new Player(src));
					continue;
				}

				const coords = Vector3.from(GetEntityCoords(ped));
				const inside = isInsideShape(shape.options, coords);
				const was = shape.inside.has(src);

				if (inside && !was) {
					shape.inside.add(src);
					shape.options.onEnter?.(shape, new Player(src));
				} else if (!inside && was) {
					shape.inside.delete(src);
					shape.options.onExit?.(shape, new Player(src));
				}
			}
		}
	}
}
