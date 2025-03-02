'use client';
import type { Header as HeaderType, Social } from '@/payload-types';
import { NavBar } from '@components/layout/NavBar/navBar';
import { Logo } from '@components/ui/Logo';
import style from './style.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import clsx from 'clsx';

export type HeaderProps = {
  data: HeaderType;
  social: Social;
};

export const Header = ({ data, social }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const initialHeaderHeight = useRef<number | null>(null);
  const isDesktop = useMediaQuery('(min-width: 64em)');

  const headerClass = clsx(style.header, scrolled && style['header--sticky']);

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      initialHeaderHeight.current = headerRef.current.offsetHeight;
    }
  };

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('scroll', updateHeaderHeight);
    return () => window.removeEventListener('scroll', updateHeaderHeight);
  }, [isDesktop]);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const currentScrollY = window.scrollY;
      const headerHeight = initialHeaderHeight.current || 0;

      if (currentScrollY > headerHeight - 10) {
        setScrolled(true);
      } else if (!isDesktop) {
        setScrolled(currentScrollY === 0 ? false : true);
      } else {
        setScrolled(currentScrollY < headerHeight ? false : true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <header className={headerClass} ref={headerRef}>
        <div className={style.container}>
          <Logo colour={data.logoColor || 'secondary'} linkClassName='site-logo' />
          <NavBar data={data} social={social} />
        </div>
      </header>
      {scrolled && <div style={{ height: `${initialHeaderHeight.current}px` }}></div>}
    </>
  );
};
