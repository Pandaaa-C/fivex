/// <reference types="@citizenfx/server" />
import type {
	Orchestrated,
	OrchestrationNet,
} from "../../shared/orchestration";

export abstract class ServerOrchestration<
	TData extends { id: number },
	TInstance extends Orchestrated<TData>,
> {
	private registry = new Map<number, TInstance>();
	private nextId = 1;

	protected abstract readonly net: OrchestrationNet;

	protected abstract wrap(
		target: number,
		data: TData,
		onChange: () => void,
		onRemove: () => void,
	): TInstance;

	protected spawn(target: number, data: Omit<TData, "id">): TInstance {
		const full = { ...data, id: this.nextId++ } as TData;
		const instance = this.wrap(
			target,
			full,
			() => emitNet(this.net.add, target, full),
			() => this.destroy(full.id, target),
		);
		if (target === -1) this.registry.set(full.id, instance);
		emitNet(this.net.add, target, full);
		return instance;
	}

	private destroy(id: number, target: number): void {
		this.registry.delete(id);
		emitNet(this.net.remove, target, id);
	}

	syncTo(source: number): void {
		emitNet(
			this.net.sync,
			source,
			[...this.registry.values()].map((i) => i.data),
		);
	}

	toArray(): TInstance[] {
		return [...this.registry.values()];
	}
}
