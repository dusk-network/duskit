import type { Readable, Unsubscriber, Writable } from "svelte/store";

/**
 * Represents the internal state of a data-fetching store.
 */
type DataStoreContent<T> = {
  /**
   * The data returned by the last successful fetch operation.
   * It is `null` initially and is reset to `null` if a fetch fails.
   * Note that it retains its previous value while a new fetch is in progress.
   */
  data: T | null;

  /** The error object if the last fetch operation failed. */
  error: Error | null;

  /** Indicates whether a fetch operation is currently in progress. */
  isLoading: boolean;
};

/**
 * A readable store designed for manual asynchronous data retrieval.
 */
type DataStore<A extends any[], R> = Readable<DataStoreContent<R>> & {
  /**
   * Triggers the data retrieval process.
   *
   * @param args - The arguments required by the data retriever function.
   */
  getData(...args: A): Promise<DataStoreContent<R>>;

  /** Resets the store to its initial empty and idle state. */
  reset(): void;
};

/**
 * Configuration options for the persisted store.
 */
export interface PersistedStoreOptions<T> {
  /**
   * A fallback function invoked when parsing the stored value fails.
   * It provides the parsing error and the raw string retrieved from storage.
   *
   * @param error - The error thrown during parsing.
   * @param rawValue - The unparsed string from storage, or null if missing.
   * @returns The fallback value to use, or `undefined` to default to the initial value.
   */
  getLoadErrorFallback?: (
    error: Error,
    rawValue: string | null
  ) => T | undefined;

  /**
   * A callback executed when the store fails to serialize or save its value.
   *
   * @param error - The error thrown during the save operation.
   * @param value - The value that failed to be saved.
   */
  onSaveError?: (error: Error, value: T) => void;

  /**
   * A function that transforms the value before it is stringified for storage.
   * Useful for serializing complex types like `Date`, `BigInt`, `Set` or `Map`.
   *
   * @param key - The property key being stringified.
   * @param value - The property value being stringified.
   * @returns The transformed value.
   */
  replacer?: (key: string, value: any) => any;

  /**
   * A function that transforms the parsed value before it is returned.
   * Useful for restoring complex types like `Date`, `BigInt`, `Set` or `Map`.
   *
   * @param key - The property key being parsed.
   * @param value - The property value being parsed.
   * @returns The transformed value.
   */
  reviver?: (key: string, value: any) => any;
}

/**
 * Configuration options for the rebind operation.
 */
export interface PersistedStoreRebindOptions<T> {
  /**
   * Determines whether the data associated with the old key should be
   * permanently removed from storage when rebinding to the new key.
   */
  clearOldKey?: boolean;

  /**
   * A strategy to resolve the final state when transitioning to the new key.
   * It receives the current state from the old key and the existing state
   * (if any) from the new key.
   * If omitted, the state from the old key is discarded, and the store
   * completely adopts the state retrieved from the new key.
   *
   * @param oldValue - The state associated with the old key.
   * @param newValue - The state retrieved from the new key.
   * @returns The merged state to be stored and broadcasted.
   */
  merger?: (oldValue: T, newValue: T) => T;
}

/**
 * A Svelte writable store tied to a persistent storage, equipped with the ability
 * to safely change the underlying storage key dynamically.
 */
export type PersistedStore<T> = Writable<T> & {
  /**
   * Points the store to a new storage key while maintaining the Svelte store reference.
   *
   * @param newKey - The new key to persist data under.
   * @param options - Configuration for the data transition process.
   */
  rebind(newKey: string, options?: PersistedStoreRebindOptions<T>): void;
};

/**
 * A readable store that manages periodic data fetching (polling).
 * It automatically pauses when the browser tab is hidden to save resources
 * and permanently stops if a fetch operation results in an error.
 */
type PollingDataStore<A extends any[], R> = Readable<DataStoreContent<R>> & {
  /** Resets the store to its initial empty state and stops any active polling. */
  reset(): void;

  /**
   * Starts the polling process.
   * If called while polling is already active, it aborts the current cycle
   * and starts a new one with the newly provided arguments.
   *
   * @param args - The arguments passed to the data retriever on every tick.
   */
  start(...args: A): void;

  /** Manually stops the active polling process. */
  stop(): void;
};

/**
 * Factory function to create a `DataStore`.
 * @param dataRetriever - An asynchronous function that fetches the data.
 */
export declare function createDataStore<
  F extends (...args: any) => Promise<any>,
>(dataRetriever: F): DataStore<Parameters<F>, Awaited<ReturnType<F>>>;

/**
 * Creates a writable store that automatically persists its state to `localStorage`.
 * It handles serialization, basic schema merging for objects, and supports
 * dynamic key rebinding.
 *
 * @param key - The initial `localStorage` key.
 * @param initialValue - The default value used if no data is found in storage.
 * @param options - Optional configuration for serialization and error handling.
 */
export declare function createPersistedStore<T>(
  key: string,
  initialValue: T,
  options?: PersistedStoreOptions<T>
): PersistedStore<T>;

/**
 * Factory function to create a `PollingDataStore`.
 *
 * @param dataRetriever - An asynchronous function called at each interval.
 * @param fetchInterval - The time in milliseconds between each fetch.
 */
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
 * @see [SameValueZero comparison](https://262.ecma-international.org/#sec-samevaluezero)
 */
export declare function onStoreChange<T>(
  store: Readable<T>,
  handler: (prev: T, curr: T) => void
): Unsubscriber;
