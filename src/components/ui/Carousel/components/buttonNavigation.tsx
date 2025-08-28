import { IconCaretRightFilled, IconCaretLeftFilled } from '@tabler/icons-react';
import style from './../style.module.scss';

interface ButtonNavigationProps {
  onClick: () => void;
  direction: 'next' | 'prev';
}

const ButtonNavigationButtons = ({ onClick, direction }: ButtonNavigationProps) => {
  return (
    <button
      className={`${style.button} ${style[`button--${direction}`]}`}
      onClick={onClick}
      aria-label={`Go to ${direction} slide`}
    >
      {direction === 'next' ? <IconCaretRightFilled /> : <IconCaretLeftFilled />}
    </button>
  );
};

export interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export const ButtonNavigation = ({ onPrev, onNext }: NavigationProps) => {
  return (
    <div className={style.button__navigation}>
      <ButtonNavigationButtons direction='prev' onClick={onPrev} />
      <ButtonNavigationButtons direction='next' onClick={onNext} />
    </div>
  );
};
