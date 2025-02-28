import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const zIndexFunction = '@use "abstracts/functions/zIndex" as *;';

describe('@function zIndex', () => {
  it('returns a z-index value from the z-index map', async () => {
    await testSass(`${zIndexFunction} .foo { z-index: zIndex('base'); }`, '.foo { z-index: 1; }');
  });
});
