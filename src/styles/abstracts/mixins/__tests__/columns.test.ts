import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const columnsMixin = `@use "abstracts/mixins/columns" as *;`;

describe('@mixin generate-col-span', () => {
  it('generates 4 column span classes', async () => {
    await testSass(
      `${columnsMixin} @include generate-col-span(4);`,
      '.col-span-1 { grid-column: span 1; } .col-span-2 { grid-column: span 2; } .col-span-3 { grid-column: span 3; } .col-span-4 { grid-column: span 4; }',
    );
  });

  it('generates 1 column span class', async () => {
    await testSass(
      `${columnsMixin} @include generate-col-span(1);`,
      '.col-span-1 { grid-column: span 1; }',
    );
  });
});
