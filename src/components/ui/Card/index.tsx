'use client';

import style from './style.module.scss';
import clsx from 'clsx';
import { createContext, useContext } from 'react';
import type { Project } from '@/payload-types';

export type Relation = 'projects' | 'services' | string | null;
export type CardData = Pick<Project, 'title' | 'slug' | 'thumbnail' | 'id' | 'details' | 'url'>;
export type CardLinkProps = {
  href?: string;
  target?: string;
  title?: string;
};

type CardContextType = {
  data?: CardData;
  relation?: Relation;
  link?: CardLinkProps;
};

export const CardContext = createContext<CardContextType | undefined>(undefined);

export type CardProps = {
  children?: React.ReactNode;
  className?: string;
  data?: CardData;
  relation?: Relation;
  textAlign?: 'centered' | 'left' | 'right' | null;
  id?: string;
  href?: string;
  target?: string;
  title?: string;
};

/**
 * Card component renders a card with a custom color, shadow, href, target, title, and action.
 * @param {CardProps} props - Card component props
 * @returns {React.ReactElement} Card component
 * @example
 * <Card data={data} href='/example' target='_blank' title='Example Link'>
 *   <CardTitle />
 *   This is a card
 * </Card>
 */
export const Card = ({
  children,
  className,
  data,
  relation,
  textAlign = 'left',
  id,
  href,
  target,
  title,
  ...props
}: CardProps) => {
  const cardClasses = clsx(style.card, style[`text-align--${textAlign}`], className, {
    [style[`${relation}`]]: relation,
  });
  const link = href || target || title ? { href, target, title } : undefined;

  return (
    <CardContext.Provider value={{ data, relation, link }}>
      <div className={cardClasses} id={id} data-testid='card' {...props}>
        {children}
      </div>
    </CardContext.Provider>
  );
};

export const useCardContext = (): CardContextType => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within a <Card> component');
  }
  return context;
};

export { CardTitle } from './CardTitle';
export { CardBody } from './CardBody';
export { CardImage } from './CardImage';
export { CardContent } from './CardContent';
