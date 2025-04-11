import type { Page, Project, Service, Category, Post } from '@/payload-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getHref } from '@/lib/utilities/getHref';
import clsx from 'clsx';
import style from './style.module.scss';

export type NavLinkProps = {
  target?: string;
  type?: 'custom' | 'reference' | null;
  reference?: {
    relationTo: 'pages' | 'projects' | 'services' | 'posts' | 'categories';
    value: Page | Project | Service | Category | Post | string | number;
  } | null;
  url?: string | null;
  newTab?: boolean | null;
  label?: string | null;
  tabIndex?: number;
};

/**
 * NavLink component is a reusable component that renders a link for navigation.
 * @param props - {@link NavLinkProps}
 * @param {string} [props.label] - The label of the link.
 * @param {string} [props.url] - The URL of the link.
 * @param {string} [props.newTab] - Whether to open the link in a new tab.
 * @param {string} [props.type] - The type of the link.
 * @param {string} [props.reference] - The collectio n reference of the link.
 * @param {number} [props.tabIndex=0] - The tab index of the link.
 * @returns {JSX.Element} The rendered link component.
 * @example
 * ```tsx
 * <NavLink url="/">Home</NavLink>
 * ```
 */
export const NavLink = ({ label, reference, newTab, url, type, tabIndex = 0 }: NavLinkProps) => {
  const pathname = usePathname();
  const href = getHref({ type, reference, url });
  if (!href) return null;

  const isActive = pathname === href || (href === '/home' && pathname === '/');

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
  const linkClasses = clsx(style.navLink, isActive && style.active);

  return (
    <Link href={href} {...newTabProps} className={linkClasses} tabIndex={tabIndex}>
      {label}
    </Link>
  );
};

/**
 * FooterNavLink component is a reusable component that renders a link for navigation.
 * @param props - {@link NavLinkProps}
 * @param {string} [props.label] - The label of the link.
 * @param {string} [props.url] - The URL of the link.
 * @param {string} [props.newTab] - Whether to open the link in a new tab.
 * @param {string} [props.type] - The type of the link.
 * @param {string} [props.reference] - The collectio n reference of the link.
 * @param {number} [props.tabIndex=0] - The tab index of the link.
 * @returns {JSX.Element} The rendered link component.
 * @example
 * ```tsx
 * <FooterNavLink url="/">Home</FooterNavLink>
 * ```
 */
export const FooterNavLink = ({
  label,
  reference,
  newTab,
  url,
  type,
  tabIndex = 0,
}: NavLinkProps) => {
  const pathname = usePathname();
  const href = getHref({ type, reference, url });
  if (!href) return null;

  const isActive = pathname === href || (href === '/home' && pathname === '/');

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
  const linkClasses = clsx(style.footerNavLink, isActive && style.active);

  return (
    <Link href={href} {...newTabProps} className={linkClasses} tabIndex={tabIndex}>
      {label}
    </Link>
  );
};
