'use client';
import type { Header, Social } from '@/payload-types';
import { NavLink } from '@/components/ui/NavLinks';
import { SocialButton } from '@/components/ui/SocialButton';
import { NavButton } from './NavButton';
import style from './style.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export type NavBarProps = {
  data: Header;
  social: Social;
  className?: string;
};

export const NavBar = ({ data, social, className, ...props }: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = data.navItems || [];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const containerClasses = clsx(style.container, className);
  const navigationClasses = clsx(style.nav);

  return (
    <div className={containerClasses} {...props} role='navigation'>
      <NavButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} className={style.nav__button} />
      <nav className={navigationClasses} aria-hidden={!menuOpen}>
        <div className={style.nav__wrapper}>
          <menu className={style.nav__main}>
            {navItems.map(({ link }, i) => {
              return (
                <li key={i}>
                  <NavLink {...link}>{link.label}</NavLink>
                </li>
              );
            })}
          </menu>
          <menu className={style.nav__social}>
            {social['social-network']?.map((item, index) => (
              <li key={index}>
                <SocialButton
                  network={item.network}
                  className={style.socialButton}
                  username={item.username}
                />
              </li>
            ))}
          </menu>
        </div>
      </nav>
    </div>
  );
};
