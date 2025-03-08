import { Card, CardBody } from '@/components/ui/Card';
import clsx from 'clsx';
import style from './style.module.scss';
import Link from 'next/link';

export type BioItem = {
  label: string | undefined | null;
  value: string | undefined | null;
  icon: React.ReactNode;
  link?: {
    href: string;
    target?: string;
    title?: string;
    label: string;
  };
};

export type BioProps = {
  items: BioItem[] | undefined | null;
  className?: string;
};

/**
 * Bio component renders a list of items with a label, value, and icon.
 * @param {BioProps} props - Bio component props
 * @returns {React.ReactElement} Bio component
 * @example
 * <Bio items={items} />
 */
export const Bio = ({ items, className }: BioProps) => {
  const bioClasses = clsx(style.bio__block, className);
  return (
    <Card className={bioClasses}>
      <CardBody>
        {items?.map((item, index) => (
          <div key={index} className={style.bio__item}>
            <div className={style.bio__item__icon}>{item.icon}</div>
            <div className={style.bio__item__content}>
              <div className={style.bio__item__label}>{item.label}</div>
              <div>
                {item?.link ? (
                  <Link href={item.link.href} target={item.link.target}>
                    {item.link.label}
                  </Link>
                ) : (
                  item?.value
                )}
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
