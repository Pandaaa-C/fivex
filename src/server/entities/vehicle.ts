/// <reference types="@citizenfx/server" />
import { Entity } from "./entity";

export class Vehicle extends Entity {
	get driver(): number {
		return GetPedInVehicleSeat(this.handle, -1);
	}

	getPedInSeat(seat: number): number {
		return GetPedInVehicleSeat(this.handle, seat);
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

	get vehicleType(): string {
		return GetVehicleType(this.handle);
	}

	get totalRepairs(): number {
		return GetVehicleTotalRepairs(this.handle);
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

	get windowTint(): number {
		return GetVehicleWindowTint(this.handle);
	}

	get model() {
		return GetEntityModel(this.handle);
	}

	get colours(): [number, number] {
		return GetVehicleColours(this.handle) as unknown as [number, number];
	}

	setColours(primary: number, secondary: number): void {
		SetVehicleColours(this.handle, primary, secondary);
	}

	get customPrimaryColour(): [number, number, number] {
		return GetVehicleCustomPrimaryColour(this.handle) as unknown as [
			number,
			number,
			number,
		];
	}

	setCustomPrimaryColour(r: number, g: number, b: number): void {
		SetVehicleCustomPrimaryColour(this.handle, r, g, b);
	}

	get customSecondaryColour(): [number, number, number] {
		return GetVehicleCustomSecondaryColour(this.handle) as unknown as [
			number,
			number,
			number,
		];
	}

	setCustomSecondaryColour(r: number, g: number, b: number): void {
		SetVehicleCustomSecondaryColour(this.handle, r, g, b);
	}

	get extraColours(): [number, number] {
		return GetVehicleExtraColours(this.handle) as unknown as [number, number];
	}

	get engineRunning(): boolean {
		return GetIsVehicleEngineRunning(this.handle);
	}

	get handbrake(): boolean {
		return GetVehicleHandbrake(this.handle);
	}

	get locked(): boolean {
		return GetVehicleDoorLockStatus(this.handle) === 2;
	}

	setDoorsLocked(locked: boolean): void {
		SetVehicleDoorsLocked(this.handle, locked ? 2 : 1);
	}

	setDoorBroken(doorIndex: number, deleteDoor = false): void {
		SetVehicleDoorBroken(this.handle, doorIndex, deleteDoor);
	}

	setAlarm(active: boolean): void {
		SetVehicleAlarm(this.handle, active);
	}

	get owner(): number {
		return NetworkGetEntityOwner(this.handle);
	}
}
