/**
 * Utility function to force the type checker to see
 * the return value of `querySelector` as a HTMLElement
 * eliminating the possibility of a `null` value.
 * Use with caution, although your test will fail anyway
 * if you get a `null`.
 *
 * @type {import("..").getAsHTMLElement}
 */
function getAsHTMLElement(container, selector) {
  return /** @type {HTMLElement} */ (container.querySelector(selector));
}

export default getAsHTMLElement;
