'use client';
import style from './style.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { IconChevronUp } from '@tabler/icons-react';

type ScrollUpButtonProps = {
  threshold?: number;
  className?: string;
  label?: string;
};

export const ScrollUpButton = ({
  threshold = 300,
  className,
  label = 'Scroll to top',
}: ScrollUpButtonProps) => {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > threshold);
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: reduceMotion.current ? 'auto' : 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <Button
      className={clsx(style.button, className, { [style.hidden]: !visible })}
      shape='circle'
      color='slate'
      hoverColor='accent'
      shadow='medium'
      width='auto'
      action={scrollToTop}
      title={label}
    >
      <IconChevronUp />
    </Button>
  );
};
