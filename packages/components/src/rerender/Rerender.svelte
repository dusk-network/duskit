<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Rerender").RerenderProps} RerenderProps */

  /* eslint-disable svelte/infinite-reactive-loop */

  import { areSVZ } from "lamb";

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

  /** @type {undefined | ReturnType<Exclude<RerenderProps["generateValue"], undefined>>}*/
  let value = generateValue && generateValue();

  let updateFlag = 0;

  $: setTimeout(() => {
    if (generateValue) {
      const newValue = generateValue();

      if (!areSVZ(value, newValue)) {
        value = newValue;
      }
    }

    updateFlag ^= 1;
  }, interval);
</script>

{#key generateValue ? value : updateFlag}
  <slot {value}>{value}</slot>
{/key}
