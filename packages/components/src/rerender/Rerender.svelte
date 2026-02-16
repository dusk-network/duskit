<script>
  /** @typedef {import("./Rerender").RerenderProps} RerenderProps */

  import { onMount } from "svelte";
  import { areSVZ } from "lamb";

  /**
   * @typedef {Object} Props
   * @property {RerenderProps["generateValue"]} [generateValue] - If a function is passed the generated value
will be used as the key for the update and as
the default value for the default slot.
Re-renders won't happen when the new value is
equal to the previous one using the
[SameValueZero comparison]{@link https://262.ecma-international.org/15.0/#sec-samevaluezero}.
If no function is passed the `updateFlag`
will be used as key and re-renders will
happen every time at the specified interval.
   * @property {RerenderProps["interval"]} [interval]
   * @property {import('svelte').Snippet<[any]>} [children]
   */

  /** @type {Props} */
  const { generateValue = undefined, interval = 1000, children } = $props();

  /** @type {undefined | ReturnType<Exclude<RerenderProps["generateValue"], undefined>>}*/
  let value = $state();

  let updateFlag = $state(0);

  onMount(() => {
    const generateValueFn = generateValue;

    if (generateValueFn) {
      value = generateValueFn();
    }

    let timerId = setTimeout(function update() {
      if (generateValueFn) {
        const newValue = generateValueFn();

        if (!areSVZ(value, newValue)) {
          value = newValue;
        }
      }

      updateFlag ^= 1;
      timerId = setTimeout(update, interval);
    }, interval);

    return () => {
      clearTimeout(timerId);
    };
  });
</script>

{#key generateValue ? value : updateFlag}
  {#if children}{@render children({ value })}{:else}{value}{/if}
{/key}
