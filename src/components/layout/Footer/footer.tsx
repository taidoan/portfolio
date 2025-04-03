'use client';

import type { Footer as FooterType, Social } from '@/payload-types';
import { FooterNavLink } from '@/components/ui/NavLinks';
import style from './style.module.scss';
import { Logo } from '@/components/ui/Logo';
import { SocialButton } from '@/components/ui/SocialButton';
import { AUTHOR_NAME } from '@/lib/constants';

export type FooterProps = {
  data: FooterType;
  social: Social;
};

export const Footer = ({ data, social }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const navItems = data.navItems || [];

  return (
    <footer className={style.footer}>
      <div className={style.footer__block}>
        <Logo colour='secondary' linkClassName={style.logo} />
        <div className={style.footer__block__content}>
          {data && data.navItems && data.navItems.length > 0 && (
            <nav className={style['footer__site-nav']} aria-label='Footer Site Navigation'>
              {navItems.map(({ link }, i) => {
                return (
                  <FooterNavLink {...link} tabIndex={0} label={link?.label} key={i}></FooterNavLink>
                );
              })}
            </nav>
          )}
          <div className={style['footer__copyright']}>
            <span>
              &copy; {currentYear} {AUTHOR_NAME}. All rights reserved.
            </span>
          </div>
        </div>
        {social && social['social-network'] && social['social-network']?.length > 0 && (
          <nav className={style['footer__social-nav']} aria-label='Footer Social Navigation'>
            {social['social-network']?.map((item, index) => (
              <SocialButton
                network={item.network}
                className={style.socialButton}
                username={item.username}
                key={index}
              />
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
};
