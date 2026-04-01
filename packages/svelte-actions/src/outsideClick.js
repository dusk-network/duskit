/** @type {import("..").outsideClick} */
function outsideClick(element) {
  /** @type {EventListener} */
  const handleClick = (event) => {
    if (
      element &&
      event.target instanceof Node &&
      !event.composedPath().includes(element)
    ) {
      element.dispatchEvent(
        new CustomEvent("outsideclick", {
          bubbles: true,
          cancelable: true,
          detail: { target: event.target },
        })
      );
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}

export default outsideClick;
