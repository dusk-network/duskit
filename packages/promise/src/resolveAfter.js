/**
 * Creates a promise that resolves after the desired
 * time with the given value.
 *
 * @type {import("..").resolveAfter}
 */
const resolveAfter = (delay, value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

export default resolveAfter;
