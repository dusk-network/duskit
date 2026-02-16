<script>
  /** @typedef {import("./Throbber").ThrobberProps} ThrobberProps */

  import { makeClassName } from "@duskit/string";

  import "./Throbber.css";

  /**
   * @typedef {Object} Props
   * @property {ThrobberProps["className"]} [className]
   * @property {ThrobberProps["duration"]} [duration] - The animation duration in milliseconds.
   * @property {ThrobberProps["size"]} [size] - The throbber's size in pixels.
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    duration = 1800,
    size = 64,
    ...rest
  } = $props();

  /** @type {SVGSVGElement} */
  let rootElement = /** @type {SVGSVGElement} */ ($state());

  export const getRootElement = () => rootElement;

  const path = [
    "M75.4 126.63",
    "a11.43 11.43 0 0 1-2.1-22.65 ",
    "40.9 40.9 0 0 0 30.5-30.6 ",
    "11.4 11.4 0 1 1 22.27 4.87",
    "h.02",
    "a63.77 63.77 0 0 1-47.8 48.05",
    "v-.02",
    "a11.38 11.38 0 0 1-2.93.37",
    "z",
  ].join("");

  const classes = $derived(makeClassName(["dusk-throbber", className]));
</script>

<svg
  bind:this={rootElement}
  {...rest}
  class={classes}
  height={`${size}px`}
  role="progressbar"
  viewBox="0 0 128 128"
  width={`${size}px`}
>
  <g>
    <path d={path} />
    <animateTransform
      attributeName="transform"
      dur={`${duration}ms`}
      from="0 64 64"
      repeatCount="indefinite"
      to="360 64 64"
      type="rotate"
    />
  </g>
</svg>
