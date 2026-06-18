<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Rerender").RerenderProps} RerenderProps */

  /* eslint-disable svelte/infinite-reactive-loop */

  import { areSVZ } from "lamb";
  import { onDestroy } from "svelte";

  /**
   * If a function is passed the generated value
   * will be used as the key for the update and as
   * the default value for the default slot.
   * Re-renders won't happen when the new value is
   * equal to the previous one using the
   * [SameValueZero comparison]{@link https://262.ecma-international.org/15.0/#sec-samevaluezero}.
   *
   * If no function is passed the `updateFlag`
   * will be used as key and re-renders will
   * happen every time at the specified interval.
   *
   * @type {RerenderProps["generateValue"]}
   */
  export let generateValue = undefined;

  /** @type {RerenderProps["interval"]} */
  export let interval = 1000;

  /** @param {RerenderProps["generateValue"]} generator */
  function updateValueIfNeeded(generator) {
    if (generator) {
      const newValue = generator();

      if (!areSVZ(value, newValue)) {
        value = newValue;
      }
    }
  }

  /** @type {undefined | ReturnType<Exclude<RerenderProps["generateValue"], undefined>>}*/
  let value;

  /** @type {number | undefined} */
  let timeoutId;

  let updateFlag = 0;

  onDestroy(() => clearTimeout(timeoutId));

  $: updateValueIfNeeded(generateValue);
  $: {
    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(
      () => {
        updateValueIfNeeded(generateValue);

        /**
         * We always mutate `updateFlag` to force Svelte to
         * re-evaluate this reactive block.
         * Since `setTimeout` only runs once, reading and
         * writing this dependency creates a deliberate reactive
         * infinite loop. This allows us to dynamically re-evaluate
         * the `interval` function at every single tick, keeping the
         * internal metronome alive without breaking reactivity when
         * external prop references change.
         */
        updateFlag ^= 1;
      },
      typeof interval === "function" ? interval() : interval
    );
  }
</script>

{#key generateValue ? value : updateFlag}
  <slot {value}>{value}</slot>
{/key}
