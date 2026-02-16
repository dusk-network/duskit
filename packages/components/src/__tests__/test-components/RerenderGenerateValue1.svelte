<script>
  import { Rerender } from "../../..";

  /**
   * @typedef {Object} Props
   * @property {Array<any>} values
   */

  /** @type {Props} */
  const { values } = $props();

  let index = 0;

  /** @type {() => number}*/
  const generateValue = () => values[index++];
</script>

<Rerender {generateValue}></Rerender>
