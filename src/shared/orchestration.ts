export interface OrchestrationNet {
	add: string;
	remove: string;
	sync: string;
}

export interface Orchestrated<TData> {
	readonly data: TData;
}
