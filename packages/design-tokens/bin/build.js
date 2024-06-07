import StyleDictionary from 'style-dictionary';
import StyleDictionaryUtils from 'style-dictionary-utils';
import { themes } from './themes.config.js';

try {
  for (const { filename, source, include } of themes) {
    console.log({filename});
    console.log({...source});
    console.log({...include});
    StyleDictionaryUtils.extend({
      include: [...include],
      source: [...source],
      platforms: {
        css: {
          transformGroup: 'css/extended',
          options: {
            basePxFontSize: 16,
          },
          buildPath: 'dist/css/',
          files: [
            {
              filter: () => true,
              destination: `${filename}-variables.css`,
              format: 'css/variables',
            },
          ],
        },
      },
    }).buildAllPlatforms();
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('🛑 Error trying to build internal css colors for code output:', e)
}
