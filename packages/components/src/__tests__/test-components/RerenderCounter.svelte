<script>
  import { Rerender } from "../../..";

  /**
   * @typedef {Object} Props
   * @property {number | undefined} [interval]
   */

  /** @type {Props} */
  const { interval = undefined } = $props();

  let counter = 0;

  /** @type {() => number} */
  const generateValue = () => counter++;
</script>

<Rerender {generateValue} {interval}></Rerender>
