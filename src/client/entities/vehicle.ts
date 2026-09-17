import { Entity } from "./entity";

export class Vehicle extends Entity {
	get speed(): number {
		return GetEntitySpeed(this.handle);
	}

	get maxSpeed(): number {
		return GetVehicleMaxSpeed(this.handle);
	}

	get currentGear(): number {
		return GetVehicleCurrentGear(this.handle);
	}

	get class(): number {
		return GetVehicleClass(this.handle);
	}

	get vehicleType(): string {
		return GetVehicleType(this.handle);
	}

	get driver(): number {
		return GetPedInVehicleSeat(this.handle, -1);
	}

	getPedInSeat(seat: number): number {
		return GetPedInVehicleSeat(this.handle, seat);
	}

	isSeatFree(seat: number): boolean {
		return IsVehicleSeatFree(this.handle, seat);
	}

	get maxPassengers(): number {
		return GetVehicleMaxNumberOfPassengers(this.handle);
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

	set engineHealth(v: number) {
		SetVehicleEngineHealth(this.handle, v);
	}

	get tankHealth(): number {
		return GetVehiclePetrolTankHealth(this.handle);
	}

	set tankHealth(v: number) {
		SetVehiclePetrolTankHealth(this.handle, v);
	}

	get fuelLevel(): number {
		return GetVehicleFuelLevel(this.handle);
	}

	set fuelLevel(v: number) {
		SetVehicleFuelLevel(this.handle, v);
	}

	get engineRunning(): boolean {
		return GetIsVehicleEngineRunning(this.handle);
	}

	set engineOn(on: boolean) {
		SetVehicleEngineOn(this.handle, on, true, true);
	}

	repair(): void {
		SetVehicleFixed(this.handle);
	}

	setUndriveable(toggle: boolean): void {
		SetVehicleUndriveable(this.handle, toggle);
	}

	setHandbrake(toggle: boolean): void {
		SetVehicleHandbrake(this.handle, toggle);
	}

	placeOnGround(): void {
		SetVehicleOnGroundProperly(this.handle);
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

	set livery(index: number) {
		SetVehicleLivery(this.handle, index);
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

	set windowTint(tint: number) {
		SetVehicleWindowTint(this.handle, tint);
	}

	get colours(): [number, number] {
		return GetVehicleColours(this.handle) as unknown as [number, number];
	}

	setColours(primary: number, secondary: number): void {
		SetVehicleColours(this.handle, primary, secondary);
	}

	setCustomPrimaryColour(r: number, g: number, b: number): void {
		SetVehicleCustomPrimaryColour(this.handle, r, g, b);
	}

	setCustomSecondaryColour(r: number, g: number, b: number): void {
		SetVehicleCustomSecondaryColour(this.handle, r, g, b);
	}

	get wheelType(): number {
		return GetVehicleWheelType(this.handle);
	}

	set wheelType(type: number) {
		SetVehicleWheelType(this.handle, type);
	}

	setModKit(kit: number): void {
		SetVehicleModKit(this.handle, kit);
	}

	getMod(modType: number): number {
		return GetVehicleMod(this.handle, modType);
	}

	setMod(modType: number, modIndex: number, customTires = false): void {
		SetVehicleMod(this.handle, modType, modIndex, customTires);
	}

	toggleMod(modType: number, toggle: boolean): void {
		ToggleVehicleMod(this.handle, modType, toggle);
	}

	setNeonEnabled(index: number, toggle: boolean): void {
		SetVehicleNeonLightEnabled(this.handle, index, toggle);
	}

	setNeonColour(r: number, g: number, b: number): void {
		SetVehicleNeonLightsColour(this.handle, r, g, b);
	}

	setTyreSmokeColour(r: number, g: number, b: number): void {
		SetVehicleTyreSmokeColor(this.handle, r, g, b);
	}

	get locked(): boolean {
		return GetVehicleDoorLockStatus(this.handle) === 2;
	}

	setDoorsLocked(locked: boolean): void {
		SetVehicleDoorsLocked(this.handle, locked ? 2 : 1);
	}

	setDoorsLockedForAllPlayers(locked: boolean): void {
		SetVehicleDoorsLockedForAllPlayers(this.handle, locked);
	}

	setAlarm(active: boolean): void {
		SetVehicleAlarm(this.handle, active);
	}
}
