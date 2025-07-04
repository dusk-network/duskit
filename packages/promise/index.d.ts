/**
 * Creates a promise that rejects after the desired
 * time with the given error.
 */
export declare function rejectAfter(
  delay: number,
  error: Error
): Promise<never>;

/**
 * Creates a promise that resolves after the desired
 * time with the given value.
 */
export declare function resolveAfter<T>(delay: number, value: T): Promise<T>;
