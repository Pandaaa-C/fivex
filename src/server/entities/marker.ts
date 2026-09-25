import type { IVector3 } from "../../shared";
import type { MarkerData } from "../../shared/markers";
import type { Orchestrated } from "../../shared/orchestration";

export class Marker implements Orchestrated<MarkerData> {
	constructor(
		public readonly target: number,
		public readonly data: MarkerData,
		private readonly onChange: () => void,
		private readonly onRemove: () => void,
	) {}

	get id(): number {
		return this.data.id;
	}

	set type(value: number) {
		this.data.type = value;
		this.onChange();
	}

	set coords(value: IVector3) {
		this.data.coords = value;
		this.onChange();
	}

	set color(value: { r: number; g: number; b: number }) {
		this.data.color = value;
		this.onChange();
	}

	set scale(value: IVector3) {
		this.data.scale = value;
		this.onChange();
	}

	set alpha(value: number) {
		this.data.alpha = value;
		this.onChange();
	}

	remove(): void {
		this.onRemove();
	}
}
