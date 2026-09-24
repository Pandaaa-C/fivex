import { type BlipData, BlipNet } from "../../shared/blips";
import { Blip } from "../entities/blip";

export class BlipPool {
	private serverBlips = new Map<number, Blip>();

	constructor() {
		onNet(BlipNet.add, (d: BlipData) => this.applyServer(d));
		onNet(BlipNet.sync, (list: BlipData[]) => {
			list.forEach((d) => {
				this.applyServer(d);
			});
		});
		onNet(BlipNet.remove, (id: number) => {
			const blip = this.serverBlips.get(id);
			if (blip) {
				blip.remove();
				this.serverBlips.delete(id);
			}
		});
	}

	new(data: Omit<BlipData, "id">): Blip {
		return this.draw(data);
	}

	private draw(data: Omit<BlipData, "id">): Blip {
		const blip = new Blip(
			AddBlipForCoord(data.coords.x, data.coords.y, data.coords.z),
		);
		if (data.sprite !== undefined) blip.sprite = data.sprite;
		if (data.color !== undefined) blip.colour = data.color;
		if (data.scale !== undefined) blip.scale = data.scale;
		if (data.shortRange) blip.shortRange = true;
		if (data.label) blip.label = data.label;
		return blip;
	}

	private applyServer(d: BlipData): void {
		const existing = this.serverBlips.get(d.id);
		if (existing) existing.remove();
		this.serverBlips.set(d.id, this.draw(d));
	}
}
