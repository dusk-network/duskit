<script>
  import { Banner } from "@duskit/components";

  export let className = undefined;
  export let title = "Heads up";
  export let variant = "info";
  export let content = "This is a banner with some extra context.";
</script>

<Banner {className} {title} {variant}>
  <p>{content}</p>
</Banner>
