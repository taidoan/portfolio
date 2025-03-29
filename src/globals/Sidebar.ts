import { GlobalConfig } from 'payload';
import { anyone, authenticated } from '@/access';
import { SidebarCategoriesBlock, SidebarLatestBlock, SidebarTagsBlock } from '@/blocks/Sidebar';

const blocks = [SidebarCategoriesBlock, SidebarLatestBlock, SidebarTagsBlock];

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'sidebarBlocks',
      label: 'Sidebar Blocks',
      labels: {
        singular: 'Block',
        plural: 'Blocks',
      },
      type: 'blocks',
      blocks: blocks,
      maxRows: 5,
      admin: {
        description: 'Control what blocks are shown in the sidebar.',
      },
    },
  ],
};
