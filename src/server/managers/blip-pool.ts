/// <reference types="@citizenfx/server" />

import { type BlipData, BlipNet } from "../../shared/blips";
import { Pool } from "../../shared/pool-base";
import { Blip } from "../entities/blip";

export class BlipPool extends Pool<Blip> {
	private blips = new Map<number, Blip>();
	private nextId = 1;

	protected ids(): number[] {
		return [...this.blips.keys()];
	}

	protected wrap(id: number): Blip {
		const blip = this.blips.get(id);
		if (!blip) throw new Error(`[fx] blip ${id} not found`);
		return blip;
	}

	at(id: number): Blip | undefined {
		return this.blips.get(id);
	}

	create(data: Omit<BlipData, "id">): Blip {
		return this.spawn(-1, data);
	}

	createFor(source: number, data: Omit<BlipData, "id">): Blip {
		return this.spawn(source, data);
	}

	private spawn(target: number, data: Omit<BlipData, "id">): Blip {
		const full: BlipData = { ...data, id: this.nextId++ };
		const blip = new Blip(
			target,
			full,
			(b) => emitNet(BlipNet.add, b.target, b.data),
			(b) => this.onRemove(b),
		);
		if (target === -1) this.blips.set(full.id, blip);
		emitNet(BlipNet.add, target, full);
		return blip;
	}

	private onRemove(blip: Blip): void {
		this.blips.delete(blip.id);
		emitNet(BlipNet.remove, blip.target, blip.id);
	}

	syncTo(source: number): void {
		emitNet(
			BlipNet.sync,
			source,
			[...this.blips.values()].map((b) => b.data),
		);
	}
}
