import type { Preview } from '@storybook/nextjs-vite';
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

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
