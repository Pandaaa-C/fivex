import { type LabelData, LabelNet } from "../../shared/labels";
import { Label } from "../entities/label";
import { ServerOrchestration } from "./orchestration";

export class LabelPool extends ServerOrchestration<LabelData, Label> {
	protected readonly net = LabelNet;

	protected wrap(
		target: number,
		data: LabelData,
		onChange: () => void,
		onRemove: () => void,
	): Label {
		return new Label(target, data, onChange, onRemove);
	}

	create(data: Omit<LabelData, "id">): Label {
		return this.spawn(-1, data);
	}

	createFor(source: number, data: Omit<LabelData, "id">): Label {
		return this.spawn(source, data);
	}
}
