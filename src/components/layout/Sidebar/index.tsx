import clsx from 'clsx';
import style from './style.module.scss';

export type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <aside className={clsx(className, style.sidebar)}>
      <div className={style.sidebar__block}>
        <h2 className={style['sidebar__block-title']}>Block Title</h2>
        First block
      </div>
      <div className={style.sidebar__block}>
        <h2 className={style['sidebar__block-title']}>Block Title</h2>
        Second block
      </div>
      <div className={style.sidebar__block}>
        <h2 className={style['sidebar__block-title']}>Block Title</h2>
        Third block
      </div>
    </aside>
  );
};

export default Sidebar;
