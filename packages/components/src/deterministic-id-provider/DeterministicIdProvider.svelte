<svelte:options immutable={true} />

<script>
  import { setContext } from "svelte";

  import { DETERMINISTIC_ID_CONTEXT_KEY } from "../__shared__/constants";

  /** @typedef {import("./DeterministicIdProvider").DeterministicIdProviderProps} DeterministicIdProviderProps */

  /** @type {DeterministicIdProviderProps["namespace"]} */
  export let namespace = undefined;

  let counter = 0;

  setContext(DETERMINISTIC_ID_CONTEXT_KEY, {
    /** @type {(componentPrefix: string) => string} */
    generateId: (componentPrefix) => {
      counter += 1;

      return namespace
        ? `${namespace}-${componentPrefix}-${counter}`
        : `${componentPrefix}-${counter}`;
    },
  });
</script>

<slot />
