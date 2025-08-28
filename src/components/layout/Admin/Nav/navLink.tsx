import { getNavIcon } from './navIconMap';
import Link from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';

type NavLinkWithIconProps = {
  href: string;
  label: string;
  className?: string;
};

/**
 * Renders a navigation link with an optional icon based on the provided label.
 *
 * @param props - The properties for the NavLinkWithIcon component.
 * @param props.href - The URL to navigate to when the link is clicked.
 * @param props.label - The text label for the navigation link, used to determine the icon.
 * @param props.className - Optional CSS class names to apply to the link element.
 * @returns A React element representing the navigation link with an icon.
 */
export const NavLinkWithIcon = ({ href, label, className }: NavLinkWithIconProps) => {
  const Icon = getNavIcon(label.toLowerCase());
  return (
    <Link href={href} className={clsx(style.nav__link, className)}>
      {Icon && <Icon />}
      {label}
    </Link>
  );
};
