import type { Ord } from "lamb";

export declare function areEqual(a: ArrayLike<any>, b: ArrayLike<any>): boolean;

export declare function max<T extends Ord, const L extends ArrayLike<T>>(
  arrayLike: L
): L[number];

export declare function maxByKey<
  K extends string,
  S extends Record<PropertyKey, any> & Record<K, Ord>,
>(key: K): <const L extends ArrayLike<S>>(arrayLike: L) => L[number][K];

export declare function min<T extends Ord, const L extends ArrayLike<T>>(
  arrayLike: L
): L[number];

export declare function minByKey<
  K extends string,
  S extends Record<PropertyKey, any> & Record<K, Ord>,
>(key: K): <const L extends ArrayLike<S>>(arrayLike: L) => L[number][K];

export declare const sum: {
  (arrayLike: ArrayLike<bigint>): bigint;
  (arrayLike: ArrayLike<number>): number;
};

export declare function shuffle<T>(array: T[]): T[];

export declare function sumByKey<K extends string>(
  key: K
): <T extends number | bigint>(
  source: ArrayLike<{ [P in K]: T } & Record<PropertyKey, any>>
) => T;
