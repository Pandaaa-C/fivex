import { Entity } from "./entity";

export class Vehicle extends Entity {
	get driver(): number {
		return GetVehiclePedIsIn(this.handle, false);
	}

	get bodyHealth(): number {
		return GetVehicleBodyHealth(this.handle);
	}

	set bodyHealth(v: number) {
		SetVehicleBodyHealth(this.handle, v);
	}

	get engineHealth(): number {
		return GetVehicleEngineHealth(this.handle);
	}

	get tankHealth(): number {
		return GetVehiclePetrolTankHealth(this.handle);
	}

	get numberPlate(): string {
		return GetVehicleNumberPlateText(this.handle);
	}

	set numberPlate(text: string) {
		SetVehicleNumberPlateText(this.handle, text);
	}

	get livery(): number {
		return GetVehicleLivery(this.handle);
	}

	get dirtLevel(): number {
		return GetVehicleDirtLevel(this.handle);
	}

	set dirtLevel(v: number) {
		SetVehicleDirtLevel(this.handle, v);
	}

	setColours(primary: number, secondary: number): void {
		SetVehicleColours(this.handle, primary, secondary);
	}

	get engineRunning(): boolean {
		return GetIsVehicleEngineRunning(this.handle);
	}

	setDoorsLocked(locked: boolean): void {
		SetVehicleDoorsLocked(this.handle, locked ? 2 : 1);
	}

	setAlarm(active: boolean): void {
		SetVehicleAlarm(this.handle, active);
	}
}
