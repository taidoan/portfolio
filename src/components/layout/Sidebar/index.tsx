import clsx from 'clsx';
import style from './style.module.scss';

export type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return <aside className={className || ''}>sidebar here</aside>;
};

export default Sidebar;
