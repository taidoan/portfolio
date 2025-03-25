import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { Media } from '@components/ui/Media';
import { Alert, AlertTitle } from '@components/ui/Alert';
import { useCardContext } from './index';
import type { Media as MediaType, Project, Service, Post } from '@/payload-types';
import type { CardData } from './index';

const isProject = (
  data: CardData,
): data is
  | Pick<Project, 'title' | 'slug' | 'thumbnail' | 'id' | 'details' | 'url' | 'categories'>
  | Pick<Post, 'title' | 'slug' | 'thumbnail' | 'id' | 'excerpt' | 'categories'> => {
  return 'thumbnail' in data;
};

const isService = (
  data: CardData,
): data is Pick<Service, 'title' | 'slug' | 'image' | 'id' | 'description'> => {
  return 'image' in data;
};

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
  const { data = {} as CardData, link, relation } = useCardContext();

  const imageClasses = clsx(style.card__image, className, {
    [style[`card__image-border-radius--${borderRadius}`]]: borderRadius && borderRadius !== 'none',
  });

  const imageSrc =
    typeof src === 'string' ? encodeURI(src.trim()) : encodeURI(src?.url?.trim() || '');

  const thumbnail = (isProject(data) && data.thumbnail) || (isService(data) && data.image) || null;

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

  const image = (
    <>
      <Media
        src={srcToUse || ''}
        alt={altToUse}
        width={widthToUse || 200}
        height={heightToUse || 200}
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
    if (srcToUse !== null) {
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

    return (
      <Alert severity='warning'>
        <AlertTitle>Missing image</AlertTitle>
        <p>The image for this card is missing. Please check the source and try again.</p>
      </Alert>
    );
  }

  return imageContainer;
};
