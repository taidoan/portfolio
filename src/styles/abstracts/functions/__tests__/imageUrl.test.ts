import { testSass } from '@scripts/scssTest';
import { describe, it } from 'vitest';

const imageURL = `@use "abstracts/functions/imageURL" as *;`;

describe('@function imageUrl', () => {
  it('joins the image path with filename', async () => {
    await testSass(
      `${imageURL} .foo { background-image: imageUrl("foo.png"); }`,
      '.foo { background-image: url("/assets/images/foo.png"); }',
    );
  });
});
