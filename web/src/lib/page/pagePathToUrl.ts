/**
 * Convert a absolute path to a URL route
 */
import { resolve, dirname, relative, basename } from 'node:path';
import { readFileSync } from 'node:fs';

/**
 * Read astro config.
 * Should be isomorphic, work both in node(ut tests) and snowpack
 * we read the config at runtime( as opposed to a simple ES 'import' ).
 */
const vicalPackage = readFileSync(resolve('package.json'), 'utf8');
const astroConfig = JSON.parse(vicalPackage || '{}')._astroConfig;
export const abspathOfPages = resolve(astroConfig.pages);

/**
 * Convert a file path in src/pages/ folder to a URL
 */
export const pagePathToUrl = (filepath: string): URL => {
  const relativePath = relative(abspathOfPages, filepath);
  const filename = basename(relativePath, '.md');
  const addressOfFilename = dirname(relativePath);

  return new URL(
    (astroConfig.buildOptions?.site || 'http://localhost:3000') +
      '/' +
      addressOfFilename +
      (filename !== 'index' ? '/' + encodeURIComponent(filename) : '')
  );
};

/**
 * The inverse of pagePathToURL.
 * Given a url, retrieve the absolute path to the file
 */
export const urlToPagePath = (url: URL): string => {
  const urlPathname = (url.pathname.endsWith('/') && url.pathname.slice(0, -1) + '/index') || url.pathname;
  return `${abspathOfPages}${urlPathname + '.md'}`;
};
