import Link from 'next/link';
import style from './style.module.scss';
import clsx from 'clsx';
import { AUTHOR_NAME } from '@/lib/constants';

type LogoProps = {
  className?: string;
  linkClassName?: string;
  colour?: 'light' | 'accent' | 'secondary' | 'primary' | 'slate' | 'frosted-sage' | 'urban-steel';
};

export const Logo = ({ className, linkClassName, colour }: LogoProps) => {
  const logoClasses = clsx(style.logo, className, colour && style[`logo--${colour}`]);
  return (
    <Link href='/' className={clsx(style.link, linkClassName)} aria-label='Homepage'>
      <svg
        aria-label={`${AUTHOR_NAME} Logo`}
        role='img'
        className={logoClasses}
        viewBox='0 0 265.7 265.7'
      >
        <title>{`${AUTHOR_NAME} Logo`}</title>
        <path
          className='cls-1'
          d='M132.85 265.7C59.6 265.7 0 206.1 0 132.85S59.6 0 132.85 0 265.7 59.6 265.7 132.85 206.1 265.7 132.85 265.7Zm0-240.7C73.38 25 25 73.38 25 132.85S73.38 240.7 132.85 240.7 240.7 192.32 240.7 132.85 192.32 25 132.85 25Z'
        />
        <path
          className='cls-1'
          d='M194.66 99.93c-5.44-10.02-13.2-17.81-23.29-23.39-10.09-5.57-21.84-8.36-35.25-8.36H85.56v39.33h35.52v-7.39h12.32c10.39 0 18.54 2.98 24.47 8.92 5.92 5.95 8.88 14.37 8.88 25.27s-2.96 19.1-8.88 24.98c-5.92 5.89-14.07 8.83-24.45 8.83v32.5h2.7c13.29 0 24.98-2.85 35.07-8.55 10.09-5.7 17.88-13.55 23.38-23.58 5.5-10.02 8.25-21.41 8.25-34.19s-2.72-24.36-8.16-34.38Zm-109.1 48.31v52.38h.07v-52.38h-.07Z'
        />
        <path
          className='cls-1'
          d='M62.89 119.97h81.29v28.27h-23.03v52.38H85.62v-52.38H62.89v-28.27z'
        />
      </svg>
    </Link>
  );
};
