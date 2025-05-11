import clsx from 'clsx';
import * as React from 'react';
import { IconCalendarWeekFilled, IconLink, IconTools, IconUserCircle } from '@tabler/icons-react';
import { capitaliseFirstLetter } from '@/lib/utilities/capitaliseFirstLetter';
import Link from 'next/link';
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

  const tools = type === 'tools' ? children : null;
  const toolsArray = Array.isArray(tools)
    ? tools
    : typeof tools === 'string'
      ? tools.split(',').map((tool) => tool.trim())
      : [];

  const toolsLink =
    type === 'tools'
      ? toolsArray.map((tool, index) => (
          <React.Fragment key={index}>
            <Link href={`/search?query=${encodeURIComponent(tool)}`}>{tool}</Link>
            {index < toolsArray.length - 1 && ', '}
          </React.Fragment>
        ))
      : null;

  return (
    <li className={clsx(className, style['details__list-item'])} {...props}>
      {type && (
        <div className={style['details__label']}>
          {type && iconMap[type] && <span className={style['details__icon']}>{iconMap[type]}</span>}
          <span>{capitaliseFirstLetter(type)}:</span>
        </div>
      )}
      <div className={style['details__content']}>{type === 'tools' ? toolsLink : children}</div>
    </li>
  );
};
