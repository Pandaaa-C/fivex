/// <reference types="@citizenfx/client" />
import type { IVector3 } from "../../shared";

export class Blip {
	constructor(public readonly handle: number) {}

	get exists(): boolean {
		return DoesBlipExist(this.handle);
	}

	set sprite(v: number) {
		SetBlipSprite(this.handle, v);
	}

	set colour(v: number) {
		SetBlipColour(this.handle, v);
	}

	set scale(v: number) {
		SetBlipScale(this.handle, v);
	}

	set shortRange(v: boolean) {
		SetBlipAsShortRange(this.handle, v);
	}

	set coords(v: IVector3) {
		SetBlipCoords(this.handle, v.x, v.y, v.z);
	}

	set label(v: string) {
		BeginTextCommandSetBlipName("STRING");
		AddTextComponentSubstringPlayerName(v);
		EndTextCommandSetBlipName(this.handle);
	}

	remove(): void {
		RemoveBlip(this.handle);
	}
}
