import React from 'react';

import type { Preview } from '@storybook/react';
import '@styles/index.scss';
import { inter, barlow, barlow_condensed } from '../src/lib/fonts';

const preview: Preview = {
  decorators: [
    (Story) => {
      document.documentElement.classList.add(
        inter.variable,
        barlow.variable,
        barlow_condensed.variable,
      );
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
  tags: ['autodocs', 'autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
