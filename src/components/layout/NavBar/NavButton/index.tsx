import style from './style.module.scss';
import clsx from 'clsx';

export type NavButtonProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

export const NavButton = ({ menuOpen, setMenuOpen, className }: NavButtonProps) => {
  return (
    <label className={clsx(style.nav__button, className)}>
      <input
        type='checkbox'
        aria-expanded={menuOpen}
        aria-label='Toggle navigation menu'
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
        readOnly
      />
      <div>
        <span tabIndex={0}></span>
        <span tabIndex={0}></span>
      </div>
    </label>
  );
};
