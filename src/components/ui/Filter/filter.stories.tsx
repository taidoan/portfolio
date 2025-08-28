import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Filter } from './index';
import { mockCategories } from '@/mocks/data/mockCategories';

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
    categories: mockCategories,
  },
};
