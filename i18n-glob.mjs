import { nexusLibs } from '@nexus/i18n';
import { execaSync } from 'execa';
import fs from 'fs-extra';

const destDir = './public/locales/';
const libsBasePath = './node_modules/@nexus';
const localeLibsPaths = nexusLibs.map((lib) => `${libsBasePath}/${lib}/dist/locales`);

for (const locales of localeLibsPaths) {
  if (fs.pathExistsSync(locales)) {
    const localesContent = `${locales}/*`;
    console.log('Copying:', localesContent, ' --> ', destDir);
    execaSync('cp', ['-R', localesContent, destDir]);
  }
}
