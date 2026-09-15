export abstract class Pool<T> {
	protected abstract ids(): number[];

	protected abstract wrap(id: number): T;

	toArray(): T[] {
		return this.ids().map(this.wrap);
	}

	get length(): number {
		return this.ids().length;
	}

	forEach(fn: (item: T) => void): void {
		for (const id of this.ids()) fn(this.wrap(id));
	}

	map<R>(fn: (item: T) => R): R[] {
		return this.toArray().map(fn);
	}

	filter(fn: (item: T) => boolean): T[] {
		return this.toArray().filter(fn);
	}

	find(fn: (item: T) => boolean): T | undefined {
		for (const id of this.ids()) {
			const item = this.wrap(id);
			if (fn(item)) return item;
		}
		return undefined;
	}
}
