import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const stickyMixin = `@use "abstracts/mixins/sticky" as *;`;

describe('@mixin sticky-wrapper', () => {
  it('creates a sticky wrapper', async () => {
    await testSass(
      `
      ${stickyMixin} .foo { @include sticky-wrapper(); }`,
      '.foo { position: relative; } @media screen and (min-width: 64em) { .foo { align-items: start; } }',
    );
  });
});

describe('@mixin sticky-content', () => {
  it('creates a sticky content with the default top with no arguments', async () => {
    await testSass(
      `
      ${stickyMixin} .bar { @include sticky-content(); }`,
      '@media screen and (min-width: 64em) { .bar { position: sticky; top: calc(var(--layout-row-spacing) * 1.5); } }',
    );
  });

  it('creates a sticky content with a custom top gap', async () => {
    await testSass(
      `
      ${stickyMixin} .bar { @include sticky-content(200px); }`,
      '@media screen and (min-width: 64em) { .bar { position: sticky; top: 200px; } }',
    );
  });
});
