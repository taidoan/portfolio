import clsx from 'clsx';
import style from './style.module.scss';

export type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <aside className={clsx(className, style.sidebar)}>
      <p>First block</p>
      <p>Second block</p>
      <p>Third block</p>
    </aside>
  );
};

export default Sidebar;
