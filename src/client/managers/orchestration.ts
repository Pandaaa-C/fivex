/// <reference types="@citizenfx/client" />
import type { OrchestrationNet } from "../../shared/orchestration";

export abstract class ClientOrchestration<
	TData extends { id: number },
	TInstance,
> {
	protected instances = new Map<number, TInstance>();

	protected abstract readonly net: OrchestrationNet;

	protected abstract draw(data: TData): TInstance;

	protected abstract erase(instance: TInstance): void;

	protected register(): void {
		onNet(this.net.add, (d: TData) => this.apply(d));
		onNet(this.net.sync, (list: TData[]) => {
			for (const d of list) this.apply(d);
		});
		onNet(this.net.remove, (id: number) => {
			const inst = this.instances.get(id);
			if (inst) {
				this.erase(inst);
				this.instances.delete(id);
			}
		});
	}

	private apply(d: TData): void {
		const existing = this.instances.get(d.id);
		if (existing) this.erase(existing);
		this.instances.set(d.id, this.draw(d));
	}

	toArray(): TInstance[] {
		return [...this.instances.values()];
	}
}
