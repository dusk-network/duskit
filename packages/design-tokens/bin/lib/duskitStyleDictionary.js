import StyleDictionary from "style-dictionary";

import { themeOverrides } from "./preprocessors/themeOverrides.js";

const DuskitStyleDictionary = new StyleDictionary({
  log: {
    verbosity: "default", // 'default' | 'silent' | 'verbose'
  },
});

DuskitStyleDictionary.registerPreprocessor(themeOverrides);

export default DuskitStyleDictionary;
