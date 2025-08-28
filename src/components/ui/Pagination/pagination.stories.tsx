import { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrev,
  PaginationNext,
} from '.';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    children: 'Pagination',
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrev disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={true}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
