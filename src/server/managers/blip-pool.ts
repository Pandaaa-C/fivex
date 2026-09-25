import { type BlipData, BlipNet } from "../../shared/blips";
import { Blip } from "../entities/blip";
import { ServerOrchestration } from "./orchestration";

export class BlipPool extends ServerOrchestration<BlipData, Blip> {
	protected readonly net = BlipNet;

	protected wrap(
		target: number,
		data: BlipData,
		onChange: () => void,
		onRemove: () => void,
	): Blip {
		return new Blip(target, data, onChange, onRemove);
	}

	create(data: Omit<BlipData, "id">): Blip {
		return this.spawn(-1, data);
	}
	createFor(source: number, data: Omit<BlipData, "id">): Blip {
		return this.spawn(source, data);
	}
}
