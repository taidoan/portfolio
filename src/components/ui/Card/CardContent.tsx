import style from './style.module.scss';
import clsx from 'clsx';
import { useCardContext } from './index';
import { IconCircleArrowRightFilled } from '@tabler/icons-react';
import Link from 'next/link';

export type CardContentProps = {
  children?: React.ReactNode;
  className?: string;
  insideContainer?: boolean;
};

export const CardContent = ({ children, className, insideContainer = false }: CardContentProps) => {
  const { data, relation, link } = useCardContext();
  const cardContentClasses = clsx(style.card__content, className, {
    [style['card__content--inside']]: insideContainer,
    [style['card__content--project']]: relation === 'projects',
  });

  const viewProjectIcon =
    relation === 'projects' && link?.href ? (
      <Link
        href={link.href}
        title={link.title}
        target={link.target}
        className={style['card__content__project-icon-link']}
        aria-label={`View ${data?.title} Project`}
      >
        <IconCircleArrowRightFilled data-testid='project-icon' />
      </Link>
    ) : null;

  return (
    <div className={cardContentClasses} data-testid='card-content'>
      <div className={style['card__content-wrapper']}>{children}</div>
      {relation === 'projects' && link && viewProjectIcon}
    </div>
  );
};
