import { SidebarLatestBlockProps } from '@/payload-types';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';
import { Divider } from '@/components/ui/Divider';
import { queryLatestPosts } from '@/lib/utilities/queries/queryLatestPosts';
import Link from 'next/link';
import { IconBook2, IconNotes } from '@tabler/icons-react';

export type Props = {
  className?: string;
} & SidebarLatestBlockProps;

export const SidebarLatestBlock = async ({ className, numberOfPosts, title }: Props) => {
  const posts = await queryLatestPosts();
  const filteredPosts = posts.docs.slice(0, numberOfPosts);

  return (
    <section className={clsx(className, style.sidebar__block)}>
      <h2 className={style['sidebar__block-title']}>{title || 'Latest'}</h2>
      <Divider
        type='content'
        color='light-grey'
        className={style['sidebar__block-divider']}
        width='full'
      />
      <ul className={style['sidebar__block-list']}>
        {filteredPosts.map((post) => (
          <li key={post.slug}>
            <Link href={post.url || '/'} className={style['sidebar__block-link']}>
              {post.title}
              {post?.url?.includes('projects') ? (
                <IconBook2 stroke={2} className={style['sidebar__block-icon']} />
              ) : (
                <IconNotes stroke={2} className={style['sidebar__block-icon']} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
