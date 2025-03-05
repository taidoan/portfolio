import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { ImageMedia } from '@components/ui/Media/Image';
import { useCardContext } from './index';
import type { Media } from '@/payload-types';

export type CardImageProps = {
  src?: string | Media;
  alt?: string;
  className?: string;
  borderRadius?: 'top' | 'bottom' | 'left' | 'right' | 'all' | 'none' | null;
  width?: number | null;
  height?: number | null;
  align?: 'top' | 'bottom';
};

export const CardImage = ({
  src,
  alt,
  className,
  borderRadius,
  width,
  height,
  align,
}: CardImageProps) => {
  const { data, link, relation } = useCardContext();
  const imageClasses = clsx(style.card__image, className, {
    [style[`card__image-border-radius--${borderRadius}`]]: borderRadius && borderRadius !== 'none',
  });

  const imageSrc =
    typeof src === 'string' ? encodeURI(src.trim()) : encodeURI(src?.url?.trim() || '');
  const thumbnail =
    typeof data?.thumbnail === 'object' && data?.thumbnail !== null ? data.thumbnail : null;
  const thumbnailUrl =
    thumbnail && typeof thumbnail.filename === 'string'
      ? encodeURI(thumbnail.filename.trim())
      : null;

  const srcToUse = imageSrc || thumbnailUrl || '';
  const altToUse = alt || thumbnail?.alt || '';

  const widthToUse = width || thumbnail?.width || null;
  const heightToUse = height || thumbnail?.height || null;

  const image = (
    <>
      <ImageMedia
        src={srcToUse}
        alt={altToUse}
        width={widthToUse}
        height={heightToUse}
        className={imageClasses}
        sizes={relation === 'projects' ? '556px' : '100vw'}
      />
      {relation === 'projects' && (
        <div className={style.card__image__overlay} data-testid='overlay'></div>
      )}
    </>
  );

  const imageContainerClasses = clsx(style.card__image__container, {
    [style[`card__image__container-align--${align}`]]: align,
  });
  const imageContainer = (
    <div className={imageContainerClasses} data-testid='image-container'>
      {image}
    </div>
  );

  if (link && link.href) {
    return (
      <Link
        href={link.href}
        target={link.target}
        title={link.title}
        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
        className={style.card__image__link}
      >
        {imageContainer}
      </Link>
    );
  }

  return imageContainer;
};
