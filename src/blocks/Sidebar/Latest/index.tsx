import { SidebarLatestBlockProps } from '@/payload-types';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';
import { Divider } from '@/components/ui/Divider';

export type Props = {
  className?: string;
} & SidebarLatestBlockProps;

export const SidebarLatestBlock = ({ className }: Props) => {
  return (
    <section className={clsx(className, style.sidebar__block)}>
      <h2 className={style['sidebar__block-title']}>Latest Posts</h2>
      <Divider
        type='content'
        color='light-grey'
        className={style['sidebar__block-divider']}
        width='full'
      />
      <ul className={style['sidebar__block-list']}>
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
      </ul>
    </section>
  );
};
