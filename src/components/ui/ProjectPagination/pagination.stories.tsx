import { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationArchiveItem,
  PaginationNextLabel,
  PaginationPreviousLabel,
} from './components';

const meta: Meta<typeof Pagination> = {
  title: 'UI/ProjectPagination',
  component: Pagination,
  tags: ['autodocs'],
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href='#' type='previous'>
            Web Project
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#' type='next'>
            Branding Project
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href='#' type='previous'>
            Web Project
          </PaginationLink>
        </PaginationItem>
        <PaginationArchiveItem />
        <PaginationItem>
          <PaginationLink href='#' type='next'>
            Branding Project
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const Labels: Story = {
  args: {},
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousLabel />
          <PaginationLink href='#' type='previous'>
            Web Project
          </PaginationLink>
        </PaginationItem>
        <PaginationArchiveItem />
        <PaginationItem>
          <PaginationNextLabel />
          <PaginationLink href='#' type='next'>
            Marketing Campaign
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
