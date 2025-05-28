import type { Readable } from "svelte/store";

type DataStoreContent<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

type DataStore<A extends any[], R> = Readable<DataStoreContent<R>> & {
  getData: (...args: A) => Promise<DataStoreContent<R>>;
  reset: () => void;
};

type PollingDataStore<A extends any[], R> = Readable<DataStoreContent<R>> & {
  reset: () => void;
  start: (...args: A) => void;
  stop: () => void;
};

export declare function createDataStore<
  F extends (...args: any) => Promise<any>,
>(dataRetriever: F): DataStore<Parameters<F>, Awaited<ReturnType<F>>>;

export declare function createPollingDataStore<
  F extends (...args: any) => Promise<any>,
>(
  dataRetriever: F,
  fetchInterval: number
): PollingDataStore<Parameters<F>, Awaited<ReturnType<F>>>;
