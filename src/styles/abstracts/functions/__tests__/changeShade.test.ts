import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const changeShadeFunction = '@use "abstracts/functions/changeShade" as *;';

describe('@function change-shade', () => {
  it('returns a color with the specified lightness', async () => {
    await testSass(
      `${changeShadeFunction} .foo { background-color: change-shade(hsl(16, 75%, 55%), 10%) }`,
      '.foo { background-color: hsl(16, 75%, 10%); }',
    );
  });

  it('changes the lightness of a color based on a hsla value', async () => {
    await testSass(
      `${changeShadeFunction} .foo { background-color: change-shade(hsla(16, 75%, 55%, 0.5), 10%) }`,
      '.foo { background-color: hsla(16, 75%, 10%, 0.5); }',
    );
  });
});

describe('@function darker-shade', () => {
  it('returns a darker shade of a color', async () => {
    await testSass(
      `${changeShadeFunction} .foo { background-color: darker-shade(hsl(4, 77%, 45%), 25%) }`,
      '.foo { background-color: hsl(4, 77%, 11.25%); }',
    );
  });
});

describe('@function lighter-shade', () => {
  it('returns a lighter shade of a color', async () => {
    await testSass(
      `${changeShadeFunction} .foo { color: lighter-shade(hsla(83, 77%, 45%, 0.8), 25%); }`,
      '.foo { color: hsla(83, 63%, 88.4210526316%, 0.95); }',
    );
  });
});
