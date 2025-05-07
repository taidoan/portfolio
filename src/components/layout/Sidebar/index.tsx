import type { Sidebar as SidebarType } from '@/payload-types';

import clsx from 'clsx';
import style from './style.module.scss';

import Link from 'next/link';
import { IconCalendar, IconLink, IconUserCircle } from '@tabler/icons-react';
import { SidebarCategoriesBlock } from '@/payload/blocks/Sidebar/Categories';
import { SidebarLatestBlock } from '@/payload/blocks/Sidebar/Latest';
import { SidebarTagsBlock } from '@/payload/blocks/Sidebar/Tags';
import { SidebarSearchBlock } from '@/payload/blocks/Sidebar/Search';

export type PostMeta = {
  publishedDate: string;
  author: string;
  categories: Array<{ title: string; url: string }>;
};

export type Props = {
  data: SidebarType;
  className?: string;
  type?: 'post';
  postMeta?: PostMeta;
};

const sidebarBlocks = {
  sidebarCategoriesBlock: SidebarCategoriesBlock,
  sidebarLatestBlock: SidebarLatestBlock,
  sidebarTagsBlock: SidebarTagsBlock,
  sidebarSearchBlock: SidebarSearchBlock,
};

const Sidebar = ({ className, data, type, postMeta }: Props) => {
  const hasBlocks =
    data.sidebarBlocks && Array.isArray(data.sidebarBlocks) && data.sidebarBlocks.length > 0;

  if (hasBlocks) {
    return (
      <aside className={clsx(className, style.sidebar)}>
        {type === 'post' && postMeta && (
          <section className={clsx(style.sidebar__block, style['sidebar__block--meta'])}>
            <ul className={style['sidebar__post-meta']}>
              {postMeta.publishedDate && (
                <li className={style['sidebar__post-meta-item']}>
                  <div className={style['sidebar__post-meta-label']}>
                    <IconCalendar
                      stroke={2.5}
                      className={clsx(
                        style['sidebar__block-icon'],
                        style['sidebar__block-icon--meta'],
                      )}
                    />
                    <span>Published:</span>
                  </div>
                  <span>{new Date(postMeta.publishedDate || '').toLocaleDateString()}</span>
                </li>
              )}
              {postMeta.author && (
                <li className={style['sidebar__post-meta-item']}>
                  <div className={style['sidebar__post-meta-label']}>
                    <IconUserCircle
                      stroke={2.5}
                      className={clsx(
                        style['sidebar__block-icon'],
                        style['sidebar__block-icon--meta'],
                      )}
                    />
                    <span>Author:</span>
                  </div>
                  <span>{postMeta.author}</span>
                </li>
              )}
              {postMeta.categories && (
                <li className={style['sidebar__post-meta-item']}>
                  <div className={style['sidebar__post-meta-label']}>
                    <IconLink
                      stroke={2.5}
                      className={clsx(
                        style['sidebar__block-icon'],
                        style['sidebar__block-icon--meta'],
                      )}
                    />
                    <span>Categories:</span>
                  </div>

                  <div>
                    {postMeta.categories.map((category, index) => (
                      <span key={category.url}>
                        <Link href={category.url} className={style['sidebar__post-meta-link']}>
                          {category.title}
                        </Link>
                        {index < postMeta.categories.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </section>
        )}
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
