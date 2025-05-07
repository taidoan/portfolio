import type { MediaBlockProps, MediaRichtextBlockProps } from '@/payload-types';
import { Media } from '@/components/ui/Media';
import RichText from '@/components/ui/RichText';
import style from './style.module.scss';
import clsx from 'clsx';
import { Alert, AlertTitle } from '@/components/ui/Alert';

export type MediaComponentProps = MediaBlockProps | MediaRichtextBlockProps;

export const BaseMediaBlock = ({
  media,
  videoPlayerWidth,
  videoWidth,
  videoHeight,
  borderRadius,
  borderRadiusSides,
  className,
  pdfHeight,
  pdfWidth,
}: MediaComponentProps) => {
  const uploadedMedia = media.media;
  const caption = media.caption;
  const showCaption = media.showCaption;

  if (
    media.mediaType !== 'embed' &&
    (!uploadedMedia || typeof uploadedMedia !== 'object' || !uploadedMedia.mimeType)
  ) {
    return (
      <Alert severity='error'>
        <AlertTitle>No Media</AlertTitle>
        <p>No media could be found. Please check the media and try again.</p>
      </Alert>
    );
  }

  const isUploadedMedia = uploadedMedia && typeof uploadedMedia === 'object';

  const isVideo = isUploadedMedia && uploadedMedia.mimeType?.startsWith('video/');
  const isImage = isUploadedMedia && uploadedMedia.mimeType?.startsWith('image/');
  const isPDF = isUploadedMedia && uploadedMedia.mimeType?.startsWith('application/pdf');
  const isEmbed = media.mediaType === 'embed';

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

  const encodedFilename =
    isUploadedMedia && uploadedMedia.filename ? encodeURI(uploadedMedia.filename.trim()) : '';

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
        <picture>
          <Media
            src={encodedFilename ?? ''}
            width={uploadedMedia.width!}
            height={uploadedMedia.height!}
            alt='Description'
            sizes='100vw'
            className={style.image}
            style={appearanceStyles}
          />
        </picture>
      ) : isPDF ? (
        <Media
          src={encodedFilename}
          style={appearanceStyles}
          pdfHeight={pdfHeight || '600px'}
          pdfWidth={pdfWidth || '100%'}
        />
      ) : isEmbed ? (
        <Media
          type='embed'
          src={media.mediaEmbedUrl!}
          source={media.mediaEmbedSource!}
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
