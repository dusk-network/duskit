import { randomUUID } from "@duskit/string";
import { getContext } from "svelte";

import { DETERMINISTIC_ID_CONTEXT_KEY } from "./constants";

/**
 * @typedef {Object} DeterministicIdContextPayload
 * @property {(componentPrefix: string) => string} generateId
 */

/**
 * @param {string} componentPrefix
 * @returns {string}
 */
export function getDeterministicId(componentPrefix) {
  /** @type {DeterministicIdContextPayload | undefined} */
  const context = getContext(DETERMINISTIC_ID_CONTEXT_KEY);

  return context
    ? context.generateId(componentPrefix)
    : `${componentPrefix}-${randomUUID()}`;
}
