/**
 * Converts a base64 string to a `Uint8Array`.
 */
export declare function base64ToBytes(s: string): Uint8Array;

/**
 * Converts a base64 string to a UTF-8 string.
 */
export declare function base64ToUTF8(s: string): string;

/**
 * Converts a `Uint8Array` in a base64 string.
 */
export declare function bytesToBase64(bytes: Uint8Array): string;

/**
 * Converts a `Uint8Array` to a hexadecimal string.
 */
export declare function bytesToHexString(bytes: Uint8Array): string;

/**
 * Converts a hexadecimal string to a `Uint8Array`.
 *
 * @example
 *
 * hexStringToBytes("ffae0253") // => Uint8Array(4) [ 255, 174, 2, 83 ]
 *
 * @throws {@link !TypeError | TypeError} If called with `null` or `undefined`
 * @throws {@link !TypeError | TypeError} If the source string has not an even length
 * @throws {@link !TypeError | TypeError} If the source string contains invalid characters
 */
export declare function hexStringToBytes(s: string): Uint8Array;

/**
 * Converts a UTF-8 string to a base64 string.
 */
export declare function utf8ToBase64(s: string): string;
