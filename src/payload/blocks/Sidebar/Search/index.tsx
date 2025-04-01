import { SidebarSearchBlockProps } from '@/payload-types';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';
import { Divider } from '@/components/ui/Divider';
import SearchBar from '@/components/ui/SearchBar';

export type Props = {
  className?: string;
} & SidebarSearchBlockProps;

export const SidebarSearchBlock = ({ className, title }: Props) => {
  if (title) {
    return (
      <section className={clsx(className, style.sidebar__block)}>
        {title && (
          <>
            <h2 className={style['sidebar__block-title']}>{title}</h2>
            <Divider
              type='content'
              color='light-grey'
              className={style['sidebar__block-divider']}
              width='full'
            />
          </>
        )}
        <SearchBar />
      </section>
    );
  }

  return <SearchBar className={style['sidebar__search']} />;
};
