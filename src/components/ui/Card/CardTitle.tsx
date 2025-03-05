import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { useCardContext } from './index';

export type CardTitleProps = {
  children?: React.ReactNode;
  className?: string;
};

export const CardTitle = ({ children, className }: CardTitleProps) => {
  const { data, link } = useCardContext();
  const titleToUse = children || (data ? data.title : null);
  const cardTitleClasses = clsx('card__title', style.card__title, className);

  if (link && link.href) {
    return (
      <h4 className={cardTitleClasses}>
        <Link
          href={link.href}
          target={link.target}
          title={link.title}
          rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
          className={style.card__title__link}
        >
          {titleToUse}
        </Link>
      </h4>
    );
  }

  return <h4 className={cardTitleClasses}>{titleToUse}</h4>;
};
