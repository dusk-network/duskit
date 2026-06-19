/**
 * Called when the observed element is resized.
 *
 * @param entry - The corresponding `ResizeObserverEntry`.
 */
export type ObserveResizeCallback = (entry: ResizeObserverEntry) => void;

/**
 * Observes resize events for a DOM element.
 *
 * Uses a shared `ResizeObserver` instance internally and is safe to call in SSR
 * environments.
 *
 * @param element - The element to observe.
 * @param callback - Invoked whenever the element is resized.
 * @returns The unsubscribe function for the registered observer.
 */
export function observeResize(
  element: Element,
  callback: ObserveResizeCallback
): () => void;
