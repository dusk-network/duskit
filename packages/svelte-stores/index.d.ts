import type { Readable, Unsubscriber, Writable } from "svelte/store";

type DataStoreContent<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

type DataStore<A extends any[], R> = Readable<DataStoreContent<R>> & {
  getData: (...args: A) => Promise<DataStoreContent<R>>;
  reset: () => void;
};

type PersistedStoreOptions<T> = {
  getLoadErrorFallback?: (
    error: Error,
    rawValue: string | null
  ) => T | undefined;
  onSaveError?: (error: Error, value: T) => void;
  replacer?: (key: string, value: any) => any;
  reviver?: (key: string, value: any) => any;
};

type PollingDataStore<A extends any[], R> = Readable<DataStoreContent<R>> & {
  reset: () => void;
  start: (...args: A) => void;
  stop: () => void;
};

export declare function createDataStore<
  F extends (...args: any) => Promise<any>,
>(dataRetriever: F): DataStore<Parameters<F>, Awaited<ReturnType<F>>>;

export declare function createPersistedStore<T>(
  key: string,
  initialValue: T,
  options?: PersistedStoreOptions<T>
): Writable<T>;

export declare function createPollingDataStore<
  F extends (...args: any) => Promise<any>,
>(
  dataRetriever: F,
  fetchInterval: number
): PollingDataStore<Parameters<F>, Awaited<ReturnType<F>>>;

/**
 * Subscribes to any Svelte store and executes a handler
 * function whenever the store's value changes.
 * The handler receives the previous and current values
 * as separate arguments.
 *
 * Uses the `SameValueZero` comparison to determine if
 * the store value has changed.
 *
 * @see [SameValueZero comparison]{@link https://262.ecma-international.org/#sec-samevaluezero}
 */
export declare function onStoreChange<T>(
  store: Readable<T>,
  handler: (prev: T, curr: T) => void
): Unsubscriber;
