import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const mqMixin = `@use "abstracts/mixins/mq" as *;`;

describe('@mixin mq', () => {
  it('generates a min-width media query', async () => {
    await testSass(
      `${mqMixin} @include mq(768px) { .foo { color: red; } }`,
      '@media screen and (min-width: 768px) { .foo { color: red; } }',
    );
  });

  it('generates a max-width media query', async () => {
    await testSass(
      `${mqMixin} @include mq(768px, 'max') { .foo { color: red; } }`,
      '@media screen and (max-width: 768px) { .foo { color: red; } }',
    );
  });

  it('generates a min-width media query with a custom breakpoint value', async () => {
    await testSass(
      `${mqMixin} @include mq(768px) { .foo { color: red; } }`,
      '@media screen and (min-width: 768px) { .foo { color: red; } }',
    );
  });

  it('generates a min-width media query with an orientation condition', async () => {
    await testSass(
      `${mqMixin} @include mq('md', $orientation: 'landscape') { .foo { color: red; } }`,
      '@media screen and (min-width: 64em) and (orientation: landscape) { .foo { color: red; } }',
    );
  });

  it('generates a max-width media query with an orientation condition', async () => {
    await testSass(
      `${mqMixin} @include mq('md', 'max', 'width', $orientation: 'landscape') { .foo { color: red; } }`,
      '@media screen and (max-width: 64em) and (orientation: landscape) { .foo { color: red; } }',
    );
  });

  it('generates a min-width media query with a custom breakpoint value and an orientation condition', async () => {
    await testSass(
      `${mqMixin} @include mq(768px, $orientation: 'landscape') { .foo { color: red; } }`,
      '@media screen and (min-width: 768px) and (orientation: landscape) { .foo { color: red; } }',
    );
  });

  it('generates a max-width media query with a custom breakpoint value and an orientation condition', async () => {
    await testSass(
      `${mqMixin} @include mq(768px, 'max', 'width', $orientation: 'landscape') { .foo { color: red; } }`,
      '@media screen and (max-width: 768px) and (orientation: landscape) { .foo { color: red; } }',
    );
  });
});
