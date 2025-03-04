import type { LinksGroupRichtextProps } from '@/payload-types';
import { Button } from '@/components/ui/Button';
import { getHref } from '@/lib/utilities/getHref';
import clsx from 'clsx';
import style from './../style.module.scss';

export type Props = {
  className?: string;
} & LinksGroupRichtextProps;

export const LinksGroupRichtextBlock = ({ className, linksGroup }: Props) => {
  return (
    <div className={style.link__group}>
      {linksGroup?.map(({ link, id }) => {
        const href = getHref(link);
        if (!href) return null;

        const newTabProps = link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
        const linkClasses = clsx({
          [`${className}`]: className,
          [`${link.className}`]: link.className,
        });

        return (
          <Button
            key={id}
            href={href}
            {...newTabProps}
            color={link.color || undefined}
            className={linkClasses}
            shadow={link.buttonShadow || undefined}
          >
            {link.label}
          </Button>
        );
      })}
    </div>
  );
};
