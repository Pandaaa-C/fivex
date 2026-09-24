import type { IVector3 } from "../../shared";
import type { BlipData } from "../../shared/blips";

export class Blip {
	constructor(
		public readonly target: number,
		public readonly data: BlipData,
		private readonly onChange: (blip: Blip) => void,
		private readonly onRemove: (blip: Blip) => void,
	) {}

	get id(): number {
		return this.data.id;
	}

	set colour(value: number) {
		this.data.color = value;
		this.onChange(this);
	}

	set sprite(value: number) {
		this.data.sprite = value;
		this.onChange(this);
	}

	set scale(value: number) {
		this.data.scale = value;
		this.onChange(this);
	}

	set label(value: string) {
		this.data.label = value;
		this.onChange(this);
	}

	set coords(value: IVector3) {
		this.data.coords = value;
		this.onChange(this);
	}

	remove(): void {
		this.onRemove(this);
	}
}
