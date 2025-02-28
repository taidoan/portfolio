import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const functions = `@use "abstracts/functions/_index" as *;`;

describe('@function sizeClamp', () => {
  it('clamps a number to a range', async () => {
    await testSass(
      `${functions} @use "abstracts/settings/dimensions" as d; .foo { width: size-clamp(rem(14), rem(20)); }`,
      '.foo { width: clamp(0.88rem, 0.7499015471rem + 0.6504922644vw, 1.25rem); }',
    );
  });
});
