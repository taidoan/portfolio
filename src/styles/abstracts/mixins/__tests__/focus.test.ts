import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const focusMixin = `@use "abstracts/mixins/focus" as *;`;

describe('@mixin focused', () => {
  it('applies focused styles to a link', async () => {
    await testSass(
      `${focusMixin} .foo { @include focused; }`,
      '.foo { background-color: var(--focus-bg-clr); box-decoration-break: clone; box-shadow: 0 -0.12rem var(--focus-bg-clr), 0 0.25rem var(--focus-text-clr); color: var(--focus-text-clr); outline: 0.19rem solid transparent; text-decoration: none; text-shadow: none; transition: box-shadow var(--transition-duration-fast) linear; }',
    );
  });
});

describe('@mixin focused-box', () => {
  it('applies focused styles to an boxed element', async () => {
    await testSass(
      `${focusMixin} .foo { @include focused-box; }`,
      '.foo { box-shadow: 0 0 0 0.19rem hsl(207, 40%, 17%), 0 0 0 0.38rem hsl(191, 72%, 51%); outline: 0.19rem solid transparent; }',
    );
  });
});
