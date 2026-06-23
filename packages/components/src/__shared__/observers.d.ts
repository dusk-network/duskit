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
 * @remarks
 * Observations always use the default `"content-box"` sizing model.
 * This provides consistent behavior across the application, matches
 * the most common resize-observation use case, and avoids the need
 * for separate observer instances for different box models.
 *
 * @param element - The element to observe.
 * @param callback - Invoked whenever the element is resized.
 * @returns The unsubscribe function for the registered observer.
 */
export function observeResize(
  element: Element,
  callback: ObserveResizeCallback
): () => void;
