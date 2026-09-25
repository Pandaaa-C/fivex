import { type BlipData, BlipNet } from "../../shared/blips";
import { Blip } from "../entities/blip";
import { ClientOrchestration } from "./orchestration";

export class BlipPool extends ClientOrchestration<BlipData, Blip> {
	protected readonly net = BlipNet;

	constructor() {
		super();
		this.register();
	}

	new(data: Omit<BlipData, "id">): Blip {
		return this.draw({ ...data, id: -1 } as BlipData);
	}

	protected draw(d: BlipData): Blip {
		const blip = new Blip(AddBlipForCoord(d.coords.x, d.coords.y, d.coords.z));
		if (d.sprite !== undefined) blip.sprite = d.sprite;
		if (d.color !== undefined) blip.colour = d.color;
		if (d.scale !== undefined) blip.scale = d.scale;
		if (d.shortRange) blip.shortRange = true;
		if (d.label) blip.label = d.label;
		return blip;
	}

	protected erase(blip: Blip): void {
		blip.remove();
	}
}
