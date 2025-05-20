export declare function rejectAfter(
  delay: number,
  error: Error
): Promise<never>;

export declare function resolveAfter<T>(delay: number, value: T): Promise<T>;
