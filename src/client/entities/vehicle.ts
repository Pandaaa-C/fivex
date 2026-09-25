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

	setForwardSpeed(speed: number): void {
		SetVehicleForwardSpeed(this.handle, speed);
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

	getOccupants(): { seat: number; ped: number }[] {
		const out: { seat: number; ped: number }[] = [];
		for (let seat = -1; seat < this.maxPassengers; seat++) {
			const ped = GetPedInVehicleSeat(this.handle, seat);
			if (ped !== 0) out.push({ seat, ped });
		}
		return out;
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

	get isDamaged(): boolean {
		return IsVehicleDamaged(this.handle);
	}

	isDriveable(): boolean {
		return IsVehicleDriveable(this.handle, false);
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

	explode(isAudible = true, isInvisible = false): void {
		ExplodeVehicle(this.handle, isAudible, isInvisible);
	}

	setUnDriveable(toggle: boolean): void {
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

	clearCustomPrimaryColour(): void {
		ClearVehicleCustomPrimaryColour(this.handle);
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

	clearCustomSecondaryColour(): void {
		ClearVehicleCustomSecondaryColour(this.handle);
	}

	get extraColours(): [number, number] {
		return GetVehicleExtraColours(this.handle) as unknown as [number, number];
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

	setLights(mode: number): void {
		SetVehicleLights(this.handle, mode);
	}

	get sirenOn(): boolean {
		return IsVehicleSirenOn(this.handle);
	}

	setSiren(on: boolean): void {
		SetVehicleSiren(this.handle, on);
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

	setDoorOpen(door: number, loose = false, instantly = false): void {
		SetVehicleDoorOpen(this.handle, door, loose, instantly);
	}

	setDoorShut(door: number, instantly = false): void {
		SetVehicleDoorShut(this.handle, door, instantly);
	}

	setDoorBroken(door: number, deleteDoor = false): void {
		SetVehicleDoorBroken(this.handle, door, deleteDoor);
	}

	rollDownWindow(window: number): void {
		RollDownWindow(this.handle, window);
	}

	rollUpWindow(window: number): void {
		RollUpWindow(this.handle, window);
	}

	smashWindow(index: number): void {
		SmashVehicleWindow(this.handle, index);
	}

	areAllWindowsInTact(): boolean {
		return AreAllVehicleWindowsIntact(this.handle);
	}

	setAlarm(active: boolean): void {
		SetVehicleAlarm(this.handle, active);
	}

	startAlarm(): void {
		StartVehicleAlarm(this.handle);
	}

	doesExtraExist(extra: number): boolean {
		return DoesExtraExist(this.handle, extra);
	}

	isExtraTurnedOn(extra: number): boolean {
		return IsVehicleExtraTurnedOn(this.handle, extra);
	}

	setExtra(extra: number, enabled: boolean): void {
		SetVehicleExtra(this.handle, extra, !enabled);
	}

	addUpsideDownCheck(): void {
		AddVehicleUpsidedownCheck(this.handle);
	}

	removeUpsideDownCheck(): void {
		RemoveVehicleUpsidedownCheck(this.handle);
	}

	doesHaveRoof(): boolean {
		return DoesVehicleHaveRoof(this.handle);
	}

	doesHaveStuckVehicleCheck(): boolean {
		return DoesVehicleHaveStuckVehicleCheck(this.handle);
	}

	doesHaveWeapons(): boolean {
		return DoesVehicleHaveWeapons(this.handle);
	}

	attachToCargoBob(
		cargobobHandle: number,
		boneIndex: number,
		x: number,
		y: number,
		z: number,
	): void {
		AttachVehicleToCargobob(cargobobHandle, this.handle, boneIndex, x, y, z);
	}

	attachToTowTruck(
		towTruckHandle: number,
		rear: boolean,
		hookOffsetX: number,
		hookOffsetY: number,
		hookOffsetZ: number,
	): void {
		AttachVehicleToTowTruck(
			towTruckHandle,
			this.handle,
			rear,
			hookOffsetX,
			hookOffsetY,
			hookOffsetZ,
		);
	}

	attachToTrailer(trailerHandle: number, radius: number): void {
		AttachVehicleToTrailer(trailerHandle, this.handle, radius);
	}

	detachFromCargoBob(cargobobHandle: number): void {
		DetachVehicleFromCargobob(cargobobHandle, this.handle);
	}

	detachFromTowTruck(towTruckHandle: number): void {
		DetachVehicleFromTowTruck(towTruckHandle, this.handle);
	}

	detachFromAnyCargoBob(): void {
		DetachVehicleFromAnyCargobob(this.handle);
	}

	detachFromAnyTowTruck(): void {
		DetachVehicleFromAnyTowTruck(this.handle);
	}

	detachFromTrailer(): void {
		DetachVehicleFromTrailer(this.handle);
	}

	canShuffleSeat(seatIndex: number): boolean {
		return CanShuffleSeat(this.handle, seatIndex);
	}

	detachWindScreen(): void {
		DetachVehicleWindscreen(this.handle);
	}

	disableImpactExplosionActivation(active: boolean): void {
		DisableVehicleImpactExplosionActivation(this.handle, active);
	}
}
