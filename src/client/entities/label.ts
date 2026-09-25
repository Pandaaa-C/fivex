/// <reference types="@citizenfx/client" />
import type { LabelData } from "../../shared/labels";

export class Label {
	constructor(public readonly data: LabelData) {}

	render(): void {
		const d = this.data;
		const dist = d.drawDistance ?? 15;

		const p = GetEntityCoords(PlayerPedId(), false);
		const dx = p[0] - d.coords.x;
		const dy = p[1] - d.coords.y;
		const dz = p[2] - d.coords.z;
		if (dx * dx + dy * dy + dz * dz > dist * dist) return;

		const col = d.color ?? { r: 255, g: 255, b: 255 };
		const scale = d.scale ?? 0.35;

		SetDrawOrigin(d.coords.x, d.coords.y, d.coords.z, 0);
		SetTextScale(scale, scale);
		SetTextFont(d.font ?? 4);
		SetTextColour(col.r, col.g, col.b, col.a ?? 215);
		SetTextCentre(true);
		BeginTextCommandDisplayText("STRING");
		AddTextComponentSubstringPlayerName(d.text);
		EndTextCommandDisplayText(0, 0);
		ClearDrawOrigin();
	}
}
