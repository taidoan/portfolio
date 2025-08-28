import { StoryObj, Meta } from '@storybook/nextjs-vite';
import { CategoryLink } from '.';
import { mockCategories } from '@/mocks/data/mockCategories';

const meta: Meta<typeof CategoryLink> = {
  title: 'UI/CategoryLink',
  component: CategoryLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CategoryLink>;
const parentCategories = mockCategories.slice(0, 3);
const subCategories = mockCategories.slice(3, 6);

export const ParentCategory: Story = {
  args: {
    type: 'category',
    category: mockCategories[2],
  },
};

export const ParentCategoryGroup: Story = {
  args: {
    type: 'category',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '2rem',
          maxWidth: '1230px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      {parentCategories.map((category, index) => (
        <CategoryLink key={index} category={category} type={args.type} />
      ))}
    </>
  ),
};

export const SubCategory: Story = {
  args: {
    type: 'sub-category',
    category: mockCategories[0],
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
};

export const SubCategoryGroup: Story = {
  args: {
    type: 'sub-category',
    size: 'small',
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '689px',
          margin: '0 auto',
          display: 'flex',
          gap: '1.5rem',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      {subCategories.map((category, index) => (
        <CategoryLink key={index} type={args.type} category={category} size={args.size} />
      ))}
    </>
  ),
};
