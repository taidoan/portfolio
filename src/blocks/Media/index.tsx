import type { MediaBlockProps } from '@/payload-types';
import { ImageMedia as OptimizedImage } from '@/components/ui/Media/Image';
import RichText from '@/components/ui/RichText';
import style from './style.module.scss';
import classNames from 'classnames';

export type Props = {
  className?: string;
} & MediaBlockProps;

export const MediaBlock = ({
  media,
  caption,
  videoPlayerWidth,
  videoWidth,
  videoHeight,
  borderRadius,
  borderRadiusSides,
  className,
}: Props) => {
  if (!media || typeof media !== 'object' || !media.mimeType) {
    return 'No media could be found.';
  }

  const isVideo = media.mimeType.startsWith('video/');
  const isImage = media.mimeType.startsWith('image/');

  const figureClasses = classNames({
    [`${className}`]: className,
    [`${style.image}`]: isImage,
    [`${style.video}`]: isVideo,
  });

  const borderRadiusValue = borderRadius
    ? `var(--border-radius-${borderRadius})`
    : 'var(--border-radius-medium)';

  let appearanceStyles: Record<string, string> = {};

  if (borderRadiusSides) {
    appearanceStyles = borderRadiusSides.reduce((styles, side) => {
      switch (side) {
        case 'all':
          return { ...styles, borderRadius: borderRadiusValue };
        case 'top-left':
          return { ...styles, borderTopLeftRadius: borderRadiusValue };
        case 'top-right':
          return { ...styles, borderTopRightRadius: borderRadiusValue };
        case 'bottom-left':
          return { ...styles, borderBottomLeftRadius: borderRadiusValue };
        case 'bottom-right':
          return { ...styles, borderBottomRightRadius: borderRadiusValue };
        default:
          return styles;
      }
    }, {});
  }

  const encodedFilename = media.filename ? encodeURI(media.filename.trim()) : '';

  return (
    <figure className={figureClasses}>
      <OptimizedImage
        src={encodedFilename ?? ''}
        width={media.width}
        height={media.height}
        alt='Description'
        sizes='100vw'
        className={style.image}
        style={appearanceStyles}
      />

      {caption && (
        <figcaption>
          <RichText data={caption} />
        </figcaption>
      )}
    </figure>
  );
};
