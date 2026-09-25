import type { IVector3 } from "../../shared";
import type { LabelData } from "../../shared/labels";
import type { Orchestrated } from "../../shared/orchestration";

export class Label implements Orchestrated<LabelData> {
	constructor(
		public readonly target: number,
		public readonly data: LabelData,
		private readonly onChange: () => void,
		private readonly baseRemove: () => void,
	) {}

	get id(): number {
		return this.data.id;
	}

	set text(v: string) {
		this.data.text = v;
		this.onChange();
	}

	set color(v: { r: number; g: number; b: number; a?: number }) {
		this.data.color = v;
		this.onChange();
	}

	set coords(v: IVector3) {
		this.data.coords = v;
		this.onChange();
	}

	remove(): void {
		this.baseRemove();
	}
}
