'use client';
import type { Header, Social } from '@/payload-types';
import { NavLink } from '@/components/ui/NavLinks';
import { SocialButton } from '@/components/ui/SocialButton';
import { NavButton } from './NavButton';
import style from './style.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export type NavBarProps = {
  data: Header;
  social: Social;
  className?: string;
};

export const NavBar = ({ data, social, className, ...props }: NavBarProps) => {
  const isDesktop = useMediaQuery('(min-width: 64em)');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = data.navItems || [];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.setAttribute('data-locked', 'true');
    } else {
      document.body.removeAttribute('data-ocked');
    }

    return () => {
      document.body.removeAttribute('data-locked');
    };
  }, [menuOpen]);

  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop]);

  const containerClasses = clsx(style.container, className);
  const navigationClasses = clsx(style.nav);

  return (
    <div className={containerClasses} {...props} role='navigation' aria-label='Main navigation'>
      {!isDesktop && (
        <NavButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} className={style.nav__button} />
      )}
      <nav className={navigationClasses} aria-hidden={!isDesktop && !menuOpen}>
        <div className={style.nav__wrapper}>
          <menu className={style.nav__main}>
            {navItems.map(({ link }, i) => {
              return (
                <li key={i}>
                  <NavLink
                    {...link}
                    tabIndex={isDesktop || menuOpen ? 0 : -1}
                    label={link.label}
                  ></NavLink>
                </li>
              );
            })}
          </menu>
          {!isDesktop &&
            social &&
            social['social-network'] &&
            social['social-network']?.length > 0 && (
              <menu className={style.nav__social}>
                {social['social-network']?.map((item, index) => (
                  <li key={index}>
                    <SocialButton
                      network={item.network}
                      className={style.socialButton}
                      username={item.username}
                      tabIndex={isDesktop || menuOpen ? 0 : -1}
                    />
                  </li>
                ))}
              </menu>
            )}
        </div>
      </nav>
    </div>
  );
};
