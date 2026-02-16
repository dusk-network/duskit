<script>
  import { Rerender } from "../../..";

  let index = 0;

  const values = [0, 1, 2];

  const generateValue = () => values[index++];
</script>

<Rerender {generateValue}>
  {#snippet children({ value = 0 })}
    <span>now the value is: {value}</span>
  {/snippet}
</Rerender>
