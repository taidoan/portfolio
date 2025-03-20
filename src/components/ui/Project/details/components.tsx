import clsx from 'clsx';
import * as React from 'react';
import { IconCalendarWeekFilled, IconLink, IconTools, IconUserCircle } from '@tabler/icons-react';
import { capitaliseFirstLetter } from '@/lib/utilities/capitaliseFirstLetter';
import style from './style.module.scss';

export const DetailsList = ({ className, ...props }: React.ComponentProps<'ul'>) => (
  <ul className={clsx(className, style['details__list'])} {...props} />
);

export const DetailsItem = ({
  className,
  type,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  type?: 'link' | 'date' | 'tools' | 'client';
  children: React.ReactNode;
}) => {
  const iconMap: Record<string, React.JSX.Element> = {
    client: <IconUserCircle data-testid='client-icon' stroke={2} />,
    date: <IconCalendarWeekFilled data-testid='date-icon' stroke={2} />,
    tools: <IconTools data-testid='tools-icon' stroke={2} />,
    link: <IconLink data-testid='link-icon' stroke={2} />,
  };

  return (
    <li className={clsx(className, style['details__list-item'])} {...props}>
      <div className={style['details__label']}>
        {type && iconMap[type] && <span className={style['details__icon']}>{iconMap[type]}</span>}
        <span>{capitaliseFirstLetter(type ? type : '')}:</span>
      </div>
      <div className={style['details__content']}>{children}</div>
    </li>
  );
};
