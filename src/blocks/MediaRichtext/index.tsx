import type { MediaRichtextBlockProps } from '@/payload-types';
import { ImageMedia } from '@components/ui/Media/Image';
import { VideoMedia } from '@components/ui/Media/Video';
import RichText from '@components/ui/RichText';
import style from './../Media/style.module.scss';
import clsx from 'clsx';
import { Alert, AlertTitle } from '@/components/ui/Alert';

export type Props = {
  className?: string;
} & MediaRichtextBlockProps;

export const MediaRichTextBlock = ({
  media,
  videoPlayerWidth,
  videoWidth,
  videoHeight,
  borderRadius,
  borderRadiusSides,
  className,
  showCaption,
  caption,
}: Props) => {
  if (!media || typeof media !== 'object' || !media.mimeType) {
    return (
      <Alert severity='error'>
        <AlertTitle>No Media</AlertTitle>
        <p>No media could be found. Please check the media and try again.</p>
      </Alert>
    );
  }

  const isVideo = media.mimeType.startsWith('video/');
  const isImage = media.mimeType.startsWith('image/');

  const figureClasses = clsx(style.container, {
    [`${className}`]: className,
    [`${style.image}`]: isImage,
    [`${style.video}`]: isVideo,
  });

  const borderRadiusValue = borderRadius
    ? `var(--border-radius-${borderRadius})`
    : 'var(--border-radius-medium)';

  let appearanceStyles: Record<string, string> = {};

  if (borderRadiusSides) {
    const safeBorderRadiusSides = Array.isArray(borderRadiusSides)
      ? borderRadiusSides
      : borderRadiusSides
        ? [borderRadiusSides]
        : [];

    appearanceStyles = safeBorderRadiusSides.reduce((styles, side) => {
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
      {isVideo ? (
        <VideoMedia
          src={encodedFilename}
          playerWidth={videoPlayerWidth ?? '100%'}
          videoHeight={videoHeight || 432}
          videoWidth={videoWidth || 768}
          style={appearanceStyles}
        />
      ) : isImage ? (
        <ImageMedia
          src={encodedFilename ?? ''}
          width={media.width}
          height={media.height}
          alt='Description'
          sizes='100vw'
          className={style.image}
          style={appearanceStyles}
        />
      ) : (
        <Alert severity='error'>
          <AlertTitle>Unsupported Media</AlertTitle>
          Unsupported media type, the media must be either a video or an image.
        </Alert>
      )}

      {showCaption && caption && (
        <figcaption className={style.caption}>
          <RichText data={caption} />
        </figcaption>
      )}
    </figure>
  );
};
