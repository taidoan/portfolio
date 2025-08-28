import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const unitFunction = '@use "abstracts/functions/units" as *;';

describe('@function strip-unit', () => {
  it('strips the px unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10px); }`, '.test { width: 10; }');
  });

  it('strips the em unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10em); }`, '.test { width: 10; }');
  });

  it('strips the rem unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10rem); }`, '.test { width: 10; }');
  });

  it('strips the ex unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10ex); }`, '.test { width: 10; }');
  });

  it('strips the ch unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10ch); }`, '.test { width: 10; }');
  });

  it('strips the vw unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10vw); }`, '.test { width: 10; }');
  });

  it('strips the vh unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10vh); }`, '.test { width: 10; }');
  });

  it('strips the vmin unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10vmin); }`, '.test { width: 10; }');
  });

  it('strips the vmax unit from a value', async () => {
    await testSass(`${unitFunction} .test { width: strip-unit(10vmax); }`, '.test { width: 10; }');
  });
});

describe('@function rem', () => {
  it('converts a px value with the px unit to rem', async () => {
    await testSass(`${unitFunction} .test { width: rem(10px); }`, '.test { width: 0.63rem; }');
  });

  it('converts a unitless px value to rem', async () => {
    await testSass(`${unitFunction} .foo { width: rem(32); }`, '.foo { width: 2rem; }');
  });
});

describe('@function em', () => {
  it('converts a px value with the px unit to em', async () => {
    await testSass(`${unitFunction} .foo { width: em(10px); }`, '.foo { width: 0.63em; }');
  });

  it('converts a unitless px value to em', async () => {
    await testSass(`${unitFunction} .foo { width: em(32); }`, '.foo { width: 2em; }');
  });

  it('returns an em value with a context size set', async () => {
    await testSass(
      `${unitFunction} span { font-size: em(50, 18); }`,
      'span { font-size: 2.78em; }',
    );
  });
});

describe('@function is-em', () => {
  it('returns true for em values', async () => {
    await testSass(`${unitFunction} .foo { width: is-em(1em); }`, '.foo { width: 1em; }');
  });

  it('returns false for non-em values', async () => {
    await testSass(`${unitFunction} .foo { width: is-em(1px); }`, '.foo { width: false; }');
  });
});

describe('@function is-rem', () => {
  it('returns true for rem values', async () => {
    await testSass(`${unitFunction} .foo { width: is-rem(1rem); }`, '.foo { width: 1rem; }');
  });

  it('returns false for non-rem values', async () => {
    await testSass(`${unitFunction} .foo { width: is-rem(1px); }`, '.foo { width: false; }');
  });
});

describe('@function is-px', () => {
  it('returns true for px values', async () => {
    await testSass(`${unitFunction} .foo { width: is-px(1px); }`, '.foo { width: 1px; }');
  });

  it('returns false for non-px values', async () => {
    await testSass(`${unitFunction} .foo { width: is-px(1rem); }`, '.foo { width: false; }');
  });
});
