/** @type {import("..").resolveAfter} */
const resolveAfter = (delay, value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

export default resolveAfter;
