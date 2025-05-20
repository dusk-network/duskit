/**
 * Creates a promise that rejects after the desired
 * time with the given error.
 *
 * @type {import("..").rejectAfter}
 */
const rejectAfter = (delay, error) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(error), delay);
  });

export default rejectAfter;
