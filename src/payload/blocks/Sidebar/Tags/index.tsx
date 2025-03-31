import type { SidebarTagsBlockProps } from '@/payload-types';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';

import { Divider } from '@/components/ui/Divider';

export type Props = {
  className?: string;
} & SidebarTagsBlockProps;

export const SidebarTagsBlock = ({ className, title }: Props) => {
  return (
    <section className={clsx(className, style.sidebar__block)}>
      <h2 className='sidebar__block-title'>{title || 'Tags'}</h2>
      <Divider
        type='content'
        color='light-grey'
        className={style['sidebar__block-divider']}
        width='full'
      />
      <ul className='sidebar__block-list'>
        <li>Tag 1</li>
        <li>Tag 2</li>
        <li>Tag 3</li>
      </ul>
    </section>
  );
};
