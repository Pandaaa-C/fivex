import { type LabelData, LabelNet } from "../../shared/labels";
import { Label } from "../entities/label";
import { ClientTickOrchestration } from "./tick-orchestration";

export class LabelPool extends ClientTickOrchestration<LabelData, Label> {
	protected readonly net = LabelNet;
	private localId = -1;

	constructor() {
		super();
		this.register();
	}

	protected wrap(d: LabelData): Label {
		return new Label(d);
	}

	protected render(l: Label): void {
		l.render();
	}

	new(data: Omit<LabelData, "id">): Label {
		return this.set({ ...data, id: this.localId-- } as LabelData);
	}
}
