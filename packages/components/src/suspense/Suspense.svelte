<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Suspense").SuspenseProps} SuspenseProps */

  import { getErrorFrom } from "@duskit/error";
  import { makeClassName } from "@duskit/string";

  import { Banner, ErrorAlert, ErrorDetails, Throbber } from "../..";
  import "./Suspense.css";

  const defaultErrorMessage = "Error";

  /** @type {SuspenseProps["as"]}*/
  export let as = "div";

  /** @type {SuspenseProps["className"]} */
  export let className = undefined;

  /** @type {SuspenseProps["errorMessage"]} */
  export let errorMessage = defaultErrorMessage;

  /** @type {SuspenseProps["errorVariant"]} */
  export let errorVariant = "alert";

  /** @type {SuspenseProps["gap"]} */
  export let gap = "default";

  /** @type {SuspenseProps["pendingMessage"]} */
  export let pendingMessage = "";

  /** @type {SuspenseProps["waitFor"]} */
  export let waitFor;

  /** @type {HTMLElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName([
    "dusk-suspense",
    `dusk-suspense--gap--${gap}`,
    className,
  ]);
</script>

<svelte:element
  this={as}
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
>
  {#await waitFor}
    <slot name="pending-content">
      <Throbber className="dusk-suspense__throbber" />
      <span class="dusk-suspense__pending-message">{pendingMessage}</span>
    </slot>
  {:then result}
    <slot name="success-content" {result} />
  {:catch thrownError}
    {@const error = getErrorFrom(thrownError)}
    <slot name="error-content" {error}>
      {#if errorVariant === "banner"}
        <Banner title="" variant="error">
          <ErrorDetails
            className="dusk-suspense__error"
            {error}
            summary={errorMessage ?? defaultErrorMessage}
          />
        </Banner>
      {:else}
        {@const ErrorComponent =
          errorVariant === "alert" ? ErrorAlert : ErrorDetails}
        {@const extraProps = errorVariant === "alert" ? { gap } : {}}

        <svelte:component
          this={ErrorComponent}
          className="dusk-suspense__error"
          {error}
          summary={errorMessage ?? defaultErrorMessage}
          {...extraProps}
        />
      {/if}
      <slot name="error-extra-content" {error} />
    </slot>
    <slot name="error-actions" />
  {/await}
</svelte:element>
