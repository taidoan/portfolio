import { join } from 'path';
import { config } from '@config';
import { compileAsync, compileStringAsync } from 'sass-embedded';
import { expect } from 'vitest';

// Array for paths for SASS/SCSS files
const sassPaths = [config.stylesPath, join(config.rootPath, 'node_modules')];

/**
 * Compiles a SASS string asynchronously
 * @param source - SASS source code to compile
 * @param options - Additional options for compilation
 * @returns A promise that resolves with the compiled CSS code
 */
export const compileSassString = async (source: string, options = {}) => {
  try {
    const result = await compileStringAsync(source, {
      loadPaths: sassPaths,
      silenceDeprecations: ['slash-div'],
      quietDeps: false,
      ...options,
    });
    return result;
  } catch (error) {
    console.error('Error compiling SASS string:', error);
    throw error;
  }
};

/**
 * Compiles a Sass file asynchronously.
 * @param path - The path to the Sass file.
 * @param options - Additional options for the compilation.
 * @returns A promise that resolves with the compiled Sass content.
 */
export const compileSassFile = (path: string, options = {}) => {
  try {
    return compileAsync(path, {
      loadPaths: sassPaths,
      silenceDeprecations: ['slash-div'],
      quietDeps: true,
      ...options,
    });
  } catch (error) {
    console.error('Error compiling SASS string:', error);
    throw error;
  }
};

/**
 * Normalizes a CSS string by replacing multiple whitespace characters with a single space
 * and trimming leading and trailing whitespace.
 *
 * @param css - The CSS string to be normalized.
 * @returns The normalized CSS string.
 */
export const normalizeCSS = (css: string) => css.replace(/\s+/g, ' ').trim();

/**
 * Compiles a SASS string and compares the result to an expected CSS string.
 * @param sassString - The SASS string to compile.
 * @param expectedCSS - The expected CSS string.
 */
export const testSass = async (sassString: string, expectedCSS: string) => {
  const result = await compileSassString(sassString);
  const normalizedCSS = normalizeCSS(result.css);
  expect(normalizedCSS).toBe(expectedCSS);
};
