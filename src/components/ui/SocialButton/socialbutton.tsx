import Link from 'next/link';
import style from './style.module.scss';
import {
  IconBrandGithubFilled,
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconBrandYoutubeFilled,
  IconBrandXFilled,
} from '@tabler/icons-react';

export type SocialButtonProps = {
  network: 'x' | 'instagram' | 'github' | 'linkedin' | 'youtube';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
  username?: string;
  tabIndex?: number;
};

const SOCIAL_DATA: Record<
  SocialButtonProps['network'],
  { url: string; icon: React.ComponentType }
> = {
  x: { url: 'https://x.com', icon: IconBrandXFilled },
  instagram: { url: 'https://instagram.com', icon: IconBrandInstagramFilled },
  github: { url: 'https://github.com', icon: IconBrandGithubFilled },
  linkedin: { url: 'https://linkedin.com/in', icon: IconBrandLinkedinFilled },
  youtube: { url: 'https://youtube.com', icon: IconBrandYoutubeFilled },
};

const getSocialUrl = (network: SocialButtonProps['network'], username?: string) => {
  const data = SOCIAL_DATA[network];
  if (!data) return undefined;
  return username && /^[a-zA-Z0-9_.@]+$/.test(username) ? `${data.url}/${username}` : data.url;
};

/**
 * SocialButton component renders a button with a social icon and a link to the social network
 * @param {@link SocialButtonProps} - The props for the SocialButton component.
 * @param {string} [props.network] - The social network to render the button for.
 * @param {string} [props.color] - `primary`, `secondary`, or `accent` - The color of the button.
 * @param {string} [props.className] - Additional class names to add to the button.
 * @param {string} [props.username] - The username of the user on the social network.
 * @returns {JSX.Element} A React component that renders a button with a social icon and a link to the social network.
 * @example
 * <SocialButton network="x" color="primary" />
 * <SocialButton network="instagram" color="secondary" />
 * <SocialButton network="github" color="accent" />
 * <SocialButton network="linkedin" color="primary" username="username" />
 * <SocialButton network="youtube" color="secondary" username="username" />
 */
export const SocialButton = ({
  network,
  color,
  className,
  username,
  tabIndex = 0,
  ...props
}: SocialButtonProps) => {
  const data = SOCIAL_DATA[network];
  const IconComponent = data.icon;

  let colorClass = '';
  if (color) {
    colorClass = `${style[`socialButton--${color}`]}`;
  }

  if (!data.url || !IconComponent) {
    console.error(`Social data for ${network} is not set.`);
    return null;
  }

  return (
    <Link
      href={getSocialUrl(network, username) || data.url}
      className={`${style.socialButton} ${colorClass} ${className}`}
      target='_blank'
      rel='noopener noreferrer'
      title={`Follow me on ${network}`}
      aria-label={`Follow me on ${network}`}
      tabIndex={tabIndex}
      {...props}
    >
      <IconComponent data-testid={`${network}-icon`} />
    </Link>
  );
};
