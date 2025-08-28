import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const headingMixin = `@use "abstracts/mixins/headings" as *;`;

describe('Heading Mixins', () => {
  it('@include section-heading should render section heading styles', async () => {
    await testSass(
      `${headingMixin} span { @include section-heading; }`,
      `span { font-family: var(--ff-display-condensed); font-size: var(--fs-section-heading); font-weight: 700; line-height: 0.8; text-overflow: ellipsis; text-transform: uppercase; } span a { color: inherit; text-decoration: none; }`,
    );
  });

  it('@include sub-heading should render sub heading styles', async () => {
    await testSass(
      `${headingMixin} span { @include sub-heading; }`,
      `span { font-size: var(--fs-sub-heading); font-weight: 800; letter-spacing: -0.02em; } span span.accent-dot { color: var(--clr-accent-400); } span span.accent-dot::selection { color: var(--selection-text-contrast-clr); } span a { color: inherit; text-decoration: none; }`,
    );
  });
});
