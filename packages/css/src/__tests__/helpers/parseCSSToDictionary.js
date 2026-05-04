import postcss from "postcss";

/**
 * Generic parser: extracts all selectors and declarations.
 *
 * @param {string} cssString
 * @returns {CSSDictionary}
 */
function parseCSSToDictionary(cssString) {
  /** @type {CSSDictionary} */
  const dictionary = {};
  const root = postcss.parse(cssString);

  root.walkRules((rule) => {
    if (!dictionary[rule.selector]) {
      dictionary[rule.selector] = {};
    }

    rule.walkDecls((decl) => {
      dictionary[rule.selector][decl.prop] = decl.value;
    });
  });

  return dictionary;
}

export default parseCSSToDictionary;
