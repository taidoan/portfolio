'use client';
import type { Header as HeaderType, Social } from '@/payload-types';
import { NavBar } from '@components/layout/NavBar/navBar';

export type HeaderProps = {
  data: HeaderType;
  social: Social;
};

export const Header = ({ data, social }: HeaderProps) => {
  return (
    <header>
      <NavBar data={data} social={social} />
    </header>
  );
};
