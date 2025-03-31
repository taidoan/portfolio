import { Meta, StoryObj } from '@storybook/react';
import { Filter } from './index';
import type { Category } from '@/payload-types';

const meta: Meta<typeof Filter> = {
  title: 'UI/Filter',
  component: Filter,
  tags: ['autodocs'],
  argTypes: {
    categories: {
      control: {
        type: 'object',
      },
      description: 'List of categories to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Filter>;

export const Categories: Story = {
  args: {
    showAllButton: true,
    allButtonLabel: 'All',
    selectedCategory: '67cece0800d7591f31a00957',
    iconMap: {
      print: <span>🖨️</span>,
      all: <span>🏷️</span>,
      'web-design': <span>🎨</span>,
    },
    categories: [
      {
        description:
          'Creating visually appealing and functional designs for physical materials, such as brochures, posters, flyers, business cards, and packaging. I ensure your printed materials leave a lasting impression.',
        slug: 'print',
        slugLock: true,
        title: 'Print',
        id: '67cece0800d7591f31a00957',
      },
      {
        description:
          'Crafting visually compelling websites that are easy to navigate and responsive across all devices. I focus on layout, typography, and interactive elements to create websites that look great and work even better.',
        slug: 'web-design',
        slugLock: true,
        parentCategory: {
          description:
            "Your online presence is everything, and I’m here to help you make it unforgettable. From sleek, responsive websites to engaging digital experiences, I design with purpose and creativity. Whether it's building a site from scratch or enhancing your existing one, I focus on user-friendly, beautiful designs that work seamlessly across devices. Let’s bring your digital vision to life and make sure it stands out in the crowded online world.",
          slug: 'digital',
          slugLock: true,
          title: 'Digital',
          id: '67ceccd600d7591f31a008bc',
        } as Category,
        title: 'Web Design',
        id: '67cecdbc00d7591f31a0091b',
      },
    ],
  },
};
