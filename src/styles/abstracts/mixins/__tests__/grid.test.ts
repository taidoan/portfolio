import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const gridMixin = `@use "abstracts/mixins/grid" as *;`;

describe('@mixin content-grid', () => {
  it('creates a grid layout with a responsive content area with a maximum width', async () => {
    await testSass(
      `${gridMixin} main { @include content-grid; }`,
      'main { display: grid; grid-template-columns: [full-width-start] minmax(var(--padding-inline), 1fr) [content-start] min(100% - var(--padding-inline) * 2, var(--content-max-width)) [content-end] minmax(var(--padding-inline), 1fr) [full-width-end]; transition: padding var(--transition-duration-fast); } main > :not(.full-width) { grid-column: content; } main > .full-width > :not(.full-width) { grid-column: content; } main > .full-width { display: grid; grid-column: full-width; grid-template-columns: inherit; padding-block: var(--layout-row-spacing); }',
    );
  });
});
