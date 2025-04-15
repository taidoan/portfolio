import { clsx } from 'clsx';
import { ContactMethodsListProps, FlatContactMethodProps } from './types';
import {
  IconSend,
  IconBrandX,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';

import style from './style.module.scss';
import Link from 'next/link';

export const contactPlatforms = [
  'email',
  'twitter',
  'github',
  'linkedin',
  'instagram',
  'youtube',
] as const;

export type ContactPlatform = (typeof contactPlatforms)[number];

const PLATFORM_ICONS: Record<ContactPlatform, React.ReactNode> = {
  email: <IconSend stroke={2} className={style.platform__icon} />,
  twitter: <IconBrandX stroke={2} className={style.platform__icon} />,
  github: <IconBrandGithub stroke={2} className={style.platform__icon} />,
  linkedin: <IconBrandLinkedin stroke={2} className={style.platform__icon} />,
  instagram: <IconBrandInstagram stroke={2} className={style.platform__icon} />,
  youtube: <IconBrandYoutube stroke={2} className={style.platform__icon} />,
};

export const ContactMethodsList = ({ className, ...props }: ContactMethodsListProps) => {
  const typedProps = props as FlatContactMethodProps;

  return (
    <ul className={clsx(style.contact__list, className)}>
      {contactPlatforms.map((platform) => {
        if (!typedProps[platform]) return null;

        const link = typedProps[`${platform}Link` as keyof FlatContactMethodProps];
        const label = typedProps[`${platform}Label` as keyof FlatContactMethodProps];
        const icon = PLATFORM_ICONS[platform];

        return (
          <li key={platform} className={style.contact__method}>
            {icon}
            {link ? (
              <Link
                href={encodeURI(link.toString())}
                target='_blank'
                rel='noopener noreferrer'
                className={style.contact__link}
              >
                {label || platform}
              </Link>
            ) : (
              <span>{label || platform}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
