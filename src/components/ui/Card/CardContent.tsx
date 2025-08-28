import style from './style.module.scss';
import clsx from 'clsx';
import { useCardContext } from './index';
import { Divider } from '@components/ui/Divider';
import { IconCircleArrowRightFilled, IconClockFilled } from '@tabler/icons-react';
import Link from 'next/link';

export type CardContentProps = {
  children?: React.ReactNode;
  className?: string;
  insideContainer?: boolean;
};

export const CardContent = ({ children, className, insideContainer = false }: CardContentProps) => {
  const { data, relation, link, kind } = useCardContext();
  const cardContentClasses = clsx(style.card__content, className, {
    [style['card__content--inside']]: insideContainer,
    [style['card__content--project']]: relation === 'projects' && kind !== 'archive',
  });

  const createdDate = data && new Date(data.createdAt).toLocaleDateString();
  const updatedDate = data && new Date(data.updatedAt).toLocaleDateString();
  const isUpdatedMoreRecent = data && new Date(data.updatedAt) > new Date(data.createdAt);

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
      {relation === 'projects' && kind !== 'archive' && link && viewProjectIcon}
      {kind === 'archive' && (
        <>
          <Divider
            type='content'
            weight='minimal'
            width='full'
            color='light-grey'
            className={style['card__archive-divider']}
          />
          <div className={style['card__archive-time']}>
            <IconClockFilled />
            <p>{isUpdatedMoreRecent ? `Updated on ${updatedDate}` : `Created on ${createdDate}`}</p>
          </div>
        </>
      )}
    </div>
  );
};
