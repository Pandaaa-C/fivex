import { type MarkerData, MarkerNet } from "../../shared/markers";
import { Marker } from "../entities/marker";
import { ClientTickOrchestration } from "./tick-orchestration";

export class MarkerPool extends ClientTickOrchestration<MarkerData, Marker> {
	protected readonly net = MarkerNet;
	private localId = -1;

	constructor() {
		super();
		this.register();
	}

	protected wrap(d: MarkerData): Marker {
		return new Marker(d);
	}

	protected render(m: Marker): void {
		m.render();
	}

	new(data: Omit<MarkerData, "id">): Marker {
		return this.set({ ...data, id: this.localId-- } as MarkerData);
	}
}
