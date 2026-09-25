import { type MarkerData, MarkerNet } from "../../shared/markers";
import { Marker } from "../entities/marker";
import { ServerOrchestration } from "./orchestration";

export class MarkerPool extends ServerOrchestration<MarkerData, Marker> {
	protected readonly net = MarkerNet;

	protected wrap(
		target: number,
		data: MarkerData,
		onChange: () => void,
		onRemove: () => void,
	): Marker {
		return new Marker(target, data, onChange, onRemove);
	}

	create(data: Omit<MarkerData, "id">): Marker {
		return this.spawn(-1, data);
	}

	createFor(source: number, data: Omit<MarkerData, "id">): Marker {
		return this.spawn(source, data);
	}
}
