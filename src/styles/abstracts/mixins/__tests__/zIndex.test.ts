import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const zIndexMixin = `@use "abstracts/mixins/zIndex" as *;`;

describe('@mixin z-index', () => {
  it('sets the z-index of an element', async () => {
    await testSass(`${zIndexMixin} .foo { @include z-index(); }`, '.foo { z-index: 1; }');
  });

  it('sets the z-index of an element to the value of the "header" key', async () => {
    await testSass(`${zIndexMixin} .foo { @include z-index("header"); }`, '.foo { z-index: 200; }');
  });

  it('sets the z-index of an element to the value of the "modal" key', async () => {
    await testSass(`${zIndexMixin} .foo { @include z-index("modal"); }`, '.foo { z-index: 400; }');
  });

  it('sets the z-index of an element to the value of the "alert" key', async () => {
    await testSass(`${zIndexMixin} .foo { @include z-index("alert"); }`, '.foo { z-index: 500; }');
  });
});
