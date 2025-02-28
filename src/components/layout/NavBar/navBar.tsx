'use client';
import type { Header, Social } from '@/payload-types';
import { NavLink } from '@/components/ui/NavLinks';

export type NavBarProps = {
  data: Header;
  social: Social;
};

export const NavBar = ({ data, social }: NavBarProps) => {
  const navItems = data.navItems || [];

  return (
    <nav>
      {' '}
      {navItems.map(({ link }, i) => {
        return (
          <li key={i}>
            <NavLink {...link}>{link.label}</NavLink>
          </li>
        );
      })}
    </nav>
  );
};
