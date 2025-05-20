import { randomInt } from "lamb";

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 * @type {import("..").shuffle}
 */
function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(0, i);

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default shuffle;
