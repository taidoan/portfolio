import type { Sidebar as SidebarType } from '@/payload-types';

import clsx from 'clsx';
import style from './style.module.scss';

import { SidebarCategoriesBlock } from '@/payload/blocks/Sidebar/Categories';
import { SidebarLatestBlock } from '@/payload/blocks/Sidebar/Latest';
import { SidebarTagsBlock } from '@/payload/blocks/Sidebar/Tags';
import { SidebarSearchBlock } from '@/payload/blocks/Sidebar/Search';

export type Props = {
  data: SidebarType;
  className?: string;
};

const sidebarBlocks = {
  sidebarCategoriesBlock: SidebarCategoriesBlock,
  sidebarLatestBlock: SidebarLatestBlock,
  sidebarTagsBlock: SidebarTagsBlock,
  sidebarSearchBlock: SidebarSearchBlock,
};

const Sidebar = ({ className, data }: Props) => {
  const hasBlocks =
    data.sidebarBlocks && Array.isArray(data.sidebarBlocks) && data.sidebarBlocks.length > 0;

  if (hasBlocks) {
    return (
      <aside className={clsx(className, style.sidebar)}>
        {data.sidebarBlocks?.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in sidebarBlocks) {
            const Block = sidebarBlocks[blockType];

            if (Block) {
              /* @ts-expect-error there may be some mismatch between the expected types here */
              return <Block key={index} {...block} disableInnerContainer />;
            }
          }
          return null;
        })}
      </aside>
    );
  }

  return null;
};

export default Sidebar;
