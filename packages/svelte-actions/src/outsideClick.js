/** @type {import("..").outsideClick} */
function outsideClick(element, options) {
  // Tracks where the interaction originated to prevent false positives.
  let isPointerDownInside = false;

  /** @type {EventListener} */
  const handlePointerDown = (event) => {
    // We use `pointerdown` solely as a sensor to detect the start of the interaction.
    // This prevents a common UX bug known as "drag-out": if a user clicks inside
    // the element, let's say a drawer for example, drags the cursor outside (e.g.,
    // to select text), and releases the mouse button, the browser fires a `click`
    // event on the document.
    // If we only listened to `click`, the drawer would close unexpectedly
    // while the user was just trying to highlight text.
    isPointerDownInside = element && event.composedPath().includes(element);
  };

  /** @type {EventListener} */
  const handleClick = (event) => {
    if (
      element &&
      event.target instanceof Node &&
      !isPointerDownInside &&
      !event.composedPath().includes(element)
    ) {
      element.dispatchEvent(
        new CustomEvent("outsideclick", {
          bubbles: true,
          cancelable: true,
          detail: { originalEvent: event },
        })
      );
    }

    // Reset the interaction state for the next sequence.
    isPointerDownInside = false;
  };

  const attach = () => {
    document.addEventListener("click", handleClick, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
  };

  const detach = () => {
    // Reset the interaction state to prevent stale state bugs,
    // like orphaned synthetic clicks if the action is disabled and re-enabled.
    isPointerDownInside = false;
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("pointerdown", handlePointerDown, true);
  };

  if (options.enabled) {
    attach();
  }

  return {
    destroy: detach,
    update(newOptions) {
      if (newOptions.enabled) {
        attach();
      } else {
        detach();
      }
    },
  };
}

export default outsideClick;
