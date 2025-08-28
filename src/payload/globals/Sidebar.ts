import { GlobalConfig } from 'payload';
import { anyone, admin } from '@/payload/access';
import {
  SidebarCategoriesBlock,
  SidebarLatestBlock,
  SidebarTagsBlock,
  SidebarSearchBlock,
} from '@/payload/blocks/Sidebar';
import { revalidateGlobal } from '@/payload/globals/hooks/revalidateGlobal';

const blocks = [SidebarCategoriesBlock, SidebarLatestBlock, SidebarTagsBlock, SidebarSearchBlock];

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: anyone,
    update: admin,
  },
  admin: {
    group: 'Layout',
  },
  hooks: {
    afterChange: [revalidateGlobal('sidebar')],
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
