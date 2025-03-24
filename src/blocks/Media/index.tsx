import type { MediaBlockProps } from '@/payload-types';
import { Media } from '@/components/ui/Media';
import RichText from '@/components/ui/RichText';
import style from './style.module.scss';
import clsx from 'clsx';
import { Alert, AlertTitle } from '@/components/ui/Alert';

export type Props = {
  className?: string;
} & MediaBlockProps;

export const MediaBlock = ({
  media,
  videoPlayerWidth,
  videoWidth,
  videoHeight,
  borderRadius,
  borderRadiusSides,
  className,
  showCaption,
  caption,
  pdfHeight,
  pdfWidth,
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
  const isPDF = media.mimeType.startsWith('application/pdf');

  const figureClasses = clsx({
    [`${className}`]: className,
    [`${style.image}`]: isImage,
    [`${style.video}`]: isVideo,
    [`${style.pdf}`]: isPDF,
  });

  const borderRadiusValue = borderRadius
    ? `var(--border-radius-${borderRadius})`
    : 'var(--border-radius-medium)';

  let appearanceStyles: Record<string, string> = {};

  if (borderRadiusSides) {
    const sides = Array.isArray(borderRadiusSides)
      ? borderRadiusSides
      : borderRadiusSides
        ? [borderRadiusSides]
        : [];

    const radiusMap = {
      all: 'borderRadius',
      'top-left': 'borderTopLeftRadius',
      'top-right': 'borderTopRightRadius',
      'bottom-left': 'borderBottomLeftRadius',
      'bottom-right': 'borderBottomRightRadius',
    };

    appearanceStyles = sides.reduce((styles, side) => {
      const property = radiusMap[side];
      return property ? { ...styles, [property]: borderRadiusValue } : styles;
    }, {});
  }

  const encodedFilename = media.filename ? encodeURI(media.filename.trim()) : '';

  return (
    <figure className={figureClasses}>
      {isVideo ? (
        <Media
          src={encodedFilename}
          playerWidth={videoPlayerWidth ?? '100%'}
          videoHeight={videoHeight || 432}
          videoWidth={videoWidth || 768}
          style={appearanceStyles}
        />
      ) : isImage ? (
        <Media
          src={encodedFilename ?? ''}
          width={media.width!}
          height={media.height!}
          alt='Description'
          sizes='100vw'
          className={style.image}
          style={appearanceStyles}
        />
      ) : isPDF ? (
        <Media
          src={encodedFilename}
          style={appearanceStyles}
          pdfHeight={pdfHeight || '600px'}
          pdfWidth={pdfWidth || '100%'}
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
