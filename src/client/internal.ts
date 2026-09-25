/// <reference types="@citizenfx/client" />
import { Net } from "../shared";

export function registerInternalHandlers(): void {
	onNet(Net.setHealth, (value: number) => {
		SetEntityHealth(PlayerPedId(), value);
	});

	onNet(Net.setArmour, (value: number) => {
		SetPedArmour(PlayerPedId(), value);
	});

	onNet(Net.setPosition, (x: number, y: number, z: number) => {
		SetEntityCoords(PlayerPedId(), x, y, z, false, false, false, true);
	});

	onNet(Net.setRotation, (x: number, y: number, z: number) => {
		SetEntityRotation(PlayerPedId(), x, y, z, 2, true);
	});

	onNet(Net.vehicleOp, (netId: number, op: string, args: unknown[]) => {
		const veh = NetworkGetEntityFromNetworkId(netId);
		if (veh === 0) return;
		switch (op) {
			case "repair":
				SetVehicleFixed(veh);
				break;
			case "explode":
				NetworkExplodeVehicle(veh, true, false, false);
				break;
			case "setMod":
				SetVehicleModKit(veh, 0);
				SetVehicleMod(veh, args[0] as number, args[1] as number, false);
				break;
			case "toggleMod":
				ToggleVehicleMod(veh, args[0] as number, args[1] as boolean);
				break;
			case "setNeon":
				SetVehicleNeonLightEnabled(veh, args[0] as number, args[1] as boolean);
				break;
			case "setNeonColour":
				SetVehicleNeonLightsColour(
					veh,
					args[0] as number,
					args[1] as number,
					args[2] as number,
				);
				break;
			case "setLivery":
				SetVehicleLivery(veh, args[0] as number);
				break;
			case "setEngineOn":
				SetVehicleEngineOn(veh, args[0] as boolean, true, true);
				break;
		}
	});
}
