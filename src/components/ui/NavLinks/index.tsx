import type { Page, Project, Service, Category } from '@/payload-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getHref } from '@/utilities/getHref';
import clsx from 'clsx';
import style from './style.module.scss';

export type NavLinkProps = {
  children?: React.ReactNode;
  href?: string | Page | null | undefined;
  target?: string;
  action?: () => void;
  type?: 'custom' | 'reference' | null;
  reference?: {
    relationTo: 'pages' | 'projects';
    value: Page | Project | Service | Category | string | number;
  } | null;
  url?: string | null;
  newTab?: boolean | null;
  label?: string | null;
};

/**
 * NavLink component is a reusable component that renders a link for navigation.
 * @param props - {@link NavLinkProps}
 * @param {string} [props.children] - The content of the link.
 * @param {string} [props.href] - The URL of the link.
 * @param {string} [props.target] - The target of the link.
 * @param {Function} [props.action] - A function to be called when the link is clicked.
 * @returns {JSX.Element} The rendered link component.
 * @example
 * ```tsx
 * <NavLink href="/">Home</NavLink>
 * ```
 */
export const NavLink = ({ children, reference, newTab, url, type }: NavLinkProps) => {
  const href = getHref({ type, reference, url });
  if (!href) return null;

  const pathname = usePathname();
  const isActive = pathname === href || (href === '/home' && pathname === '/');

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
  const linkClasses = clsx(style.navLink, isActive && style.active);

  return (
    <Link href={href} {...newTabProps} className={linkClasses}>
      {children}
    </Link>
  );
};

/**
 * FooterNavLink component is a reusable component that renders a link for navigation.
 * @param props - {@link NavLinkProps}
 * @param {string} [props.children] - The content of the link.
 * @param {string} [props.href] - The URL of the link.
 * @param {string} [props.target] - The target of the link.
 * @returns {JSX.Element} The rendered link component.
 * @example
 * ```tsx
 * <FooterNavLink href="/">Home</FooterNavLink>
 * ```
 */
export const FooterNavLink = ({ children, reference, newTab, url, type }: NavLinkProps) => {
  const href = getHref({ type, reference, url });
  if (!href) return null;

  const pathname = usePathname();
  const isActive = pathname === href || (href === '/home' && pathname === '/');

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
  const linkClasses = clsx(style.footerNavLink, isActive && style.active);

  return (
    <Link href={href} {...newTabProps} className={linkClasses}>
      {children}
    </Link>
  );
};
