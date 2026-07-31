/**
 * Returns the next focusable tab index for a tablist navigation key.
 *
 * @param {string} key
 * @param {number} currentIndex
 * @param {number} itemCount
 * @returns {number | undefined}
 */
export default function getTabNavigationIndex(key, currentIndex, itemCount) {
  if (itemCount === 0) {
    return undefined;
  }

  switch (key) {
    case "ArrowLeft":
      return currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
    case "ArrowRight":
      return currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
    case "Home":
      return 0;
    case "End":
      return itemCount - 1;
    default:
      return undefined;
  }
}
