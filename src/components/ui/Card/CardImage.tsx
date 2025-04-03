import type { Media as MediaType } from '@/payload-types';
import type { CardData, ProjectCard, ServiceCard, PostCard } from './types';

import clsx from 'clsx';
import Link from 'next/link';

import style from './style.module.scss';
import { useCardContext } from './index';

import { Media } from '@components/ui/Media';
import { Alert, AlertTitle } from '../Alert';

export const isProject = (data: CardData): data is ProjectCard =>
  data.relationTo === 'projects' || data.doc?.relationTo === 'projects';
export const isService = (data: CardData): data is ServiceCard => data.relationTo === 'services';
export const isPost = (data: CardData): data is PostCard => data.relationTo === 'posts';

const isMedia = (value: string | MediaType): value is MediaType => {
  return typeof value === 'object' && value !== null && 'filename' in value;
};

export type CardImageProps = {
  src?: string | MediaType | null;
  alt?: string;
  className?: string;
  borderRadius?: 'top' | 'bottom' | 'left' | 'right' | 'all' | 'none' | null;
  width?: number | null;
  height?: number | null;
  align?: 'top' | 'bottom' | 'left' | 'right';
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
  const { data = {} as CardData, link, relation, kind } = useCardContext();

  const imageClasses = clsx(style.card__image, className, {
    [style[`card__image-border-radius--${borderRadius}`]]: borderRadius && borderRadius !== 'none',
  });

  const imageSrc =
    typeof src === 'string' ? encodeURI(src.trim()) : encodeURI(src?.url?.trim() || '');

  const thumbnail =
    (isProject(data) && data.thumbnail) ||
    (isService(data) && data.image) ||
    (isPost(data) && data.thumbnail) ||
    null;

  const thumbnailUrl =
    thumbnail && isMedia(thumbnail) && typeof thumbnail.filename === 'string'
      ? encodeURI(thumbnail.filename.trim())
      : thumbnail && typeof thumbnail === 'string'
        ? encodeURI(thumbnail.trim())
        : null;

  const altToUse = alt || (thumbnail && isMedia(thumbnail) ? thumbnail.alt : '');
  const widthToUse = width || (thumbnail && isMedia(thumbnail) ? thumbnail.width : null);
  const heightToUse = height || (thumbnail && isMedia(thumbnail) ? thumbnail.height : null);

  const srcToUse = imageSrc || thumbnailUrl || null;

  const image = srcToUse ? (
    <>
      <Media
        src={srcToUse || ''}
        alt={altToUse}
        width={widthToUse || 200}
        height={heightToUse || 200}
        className={imageClasses}
        sizes={relation === 'projects' ? '556px' : '100vw'}
      />
      {relation === 'projects' && kind !== 'archive' && (
        <div className={style.card__image__overlay} data-testid='overlay'></div>
      )}
    </>
  ) : data.title ? (
    <div className={clsx(imageClasses, style.card__image__placeholder)}>{data.title}</div>
  ) : (
    <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      <p>No image or placeholder found.</p>
    </Alert>
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
