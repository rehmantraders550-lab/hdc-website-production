import StyleDictionary from 'style-dictionary';
import { readFile } from 'node:fs/promises';

// Style Dictionary owns conversion; component CSS owns layout and states.
const dictionary = new StyleDictionary({
  source: ['design/hdc.tokens.json'],
  log: { warnings: 'error', errors: { brokenReferences: 'throw' } },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'hdc',
      buildPath: 'assets/css/',
      files: [{
        destination: 'hdc-tokens.css',
        format: 'css/variables',
        options: {
          selector: 'body[data-hdc-system="v2"]',
          outputReferences: true,
          showFileHeader: false,
        },
      }],
    },
  },
});

if (process.argv.includes('--check')) {
  const files = await dictionary.formatPlatform('css');
  for (const file of files) {
    const committed = await readFile(file.destination, 'utf8');
    if (committed !== file.output) {
      throw new Error(`${file.destination} is stale. Run npm run tokens:build and commit the output.`);
    }
  }
  console.log('Design tokens match the committed CSS.');
} else {
  await dictionary.buildAllPlatforms();
}
