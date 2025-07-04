/** @type {import("..").getAsHTMLElement} */
function getAsHTMLElement(container, selector) {
  return /** @type {HTMLElement} */ (container.querySelector(selector));
}

export default getAsHTMLElement;
