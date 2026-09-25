/// <reference types="@citizenfx/client" />
import type { OrchestrationNet } from "../../shared/orchestration";

export abstract class ClientTickOrchestration<
	TData extends { id: number },
	TInstance,
> {
	protected instances = new Map<number, TInstance>();
	private tick: number | null = null;

	protected abstract readonly net: OrchestrationNet;

	protected abstract wrap(data: TData): TInstance;

	protected abstract render(instance: TInstance): void;

	protected register(): void {
		onNet(this.net.add, (d: TData) => {
			this.set(d);
		});
		onNet(this.net.sync, (list: TData[]) => {
			for (const d of list) this.set(d);
		});
		onNet(this.net.remove, (id: number) => this.delete(id));
	}

	protected set(d: TData): TInstance {
		const inst = this.wrap(d);
		this.instances.set(d.id, inst);
		this.ensureTick();
		return inst;
	}

	protected delete(id: number): void {
		this.instances.delete(id);
		if (this.instances.size === 0 && this.tick !== null) {
			clearTick(this.tick);
			this.tick = null;
		}
	}

	private ensureTick(): void {
		if (this.tick !== null) return;
		this.tick = setTick(() => {
			for (const inst of this.instances.values()) this.render(inst);
		});
	}

	toArray(): TInstance[] {
		return [...this.instances.values()];
	}
}
