'use client';
import type { Header, Social } from '@/payload-types';
import { NavLink } from '@/components/ui/NavLinks';
import { NavButton } from './NavButton';
import style from './style.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export type NavBarProps = {
  data: Header;
  social: Social;
};

export const NavBar = ({ data, social }: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = data.navItems || [];

  const containerClasses = clsx(style.container);
  const navigationClasses = clsx(style.nav);

  return (
    <div className={containerClasses}>
      <NavButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} className={style.nav__button} />
      <nav className={navigationClasses} aria-hidden={!menuOpen}>
        <div className={style.nav__wrapper}>
          <menu>
            {navItems.map(({ link }, i) => {
              return (
                <li key={i}>
                  <NavLink {...link}>{link.label}</NavLink>
                </li>
              );
            })}
          </menu>
          <menu>
            {social['social-network']?.map((item, index) => <li key={index}>{item.network}</li>)}
          </menu>
        </div>
      </nav>
    </div>
  );
};
