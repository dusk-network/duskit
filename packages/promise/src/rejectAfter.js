/** @type {import("..").rejectAfter} */
const rejectAfter = (delay, error) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(error), delay);
  });

export default rejectAfter;
