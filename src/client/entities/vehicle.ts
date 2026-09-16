import {Entity} from "./entity";

export class Vehicle extends Entity {
    get speed(): number {
        return GetEntitySpeed(this.handle);
    }

    get bodyHealth(): number {
        return GetVehicleBodyHealth(this.handle);
    }

    get dashboardColor(): number {
        return GetVehicleDashboardColor(this.handle);
    }

    get dead(): boolean {
        return IsEntityDead(this.handle);
    }

    get engine(): boolean {
        return GetIsVehicleEngineRunning(this.handle);
    }

    get engineHealth(): number {
        return GetVehicleEngineHealth(this.handle);
    }

    get highBeams(): boolean {
        const highBeamValue = Number(GetVehicleLightsState(this.handle)[2]);
        return highBeamValue === 1;
    }

    get engineOn(): boolean {
        return GetIsVehicleEngineRunning(this.handle);
    }

    set engineOn(v: boolean) {
        SetVehicleEngineOn(this.handle, v, true, true);
    }

    repair(): void {
        SetVehicleFixed(this.handle);
    }

    destroy() {
        DeleteVehicle(this.handle);
    }

    explode() {
        ExplodeVehicle(this.handle, true, true);
    }
}
