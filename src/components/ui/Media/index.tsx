'use client';
import { ImageMedia, type ImageMediaProps } from './Image';
import { VideoMedia, type VideoMediaProps } from './Video';
import { PDFMedia, type PDFMediaProps } from './PDF';
import { Alert, AlertTitle } from '@/components/ui/Alert';

export type MediaProps = {
  type?: 'image' | 'video' | 'pdf' | 'auto';
  pdfWidth?: string | number;
  pdfHeight?: string | number;
} & Partial<ImageMediaProps & VideoMediaProps & PDFMediaProps>;

/**
 * Media component that renders the appropriate media component based on the file type
 * @param {MediaProps} props - The props for the Media component
 * @returns {JSX.Element} The rendered media component
 * @example
 * // Automatic detection based on file extension
 * <Media src="example.jpg" alt="Example image" />
 * <Media src="example.mp4" alt="Example video" />
 * <Media src="example.pdf" alt="Example PDF" />
 *
 * // Explicitly specify the type
 * <Media src="example.jpg" type="image" alt="Example image" />
 */
export const Media = ({
  src,
  alt = '',
  type = 'auto',
  width,
  height,
  className = '',
  style = {},
  priority = false,
  sizes = '100vw',
  fill = false,
  quality = 80,
  onClick,
  playerWidth,
  pdfWidth,
  pdfHeight,
}: MediaProps) => {
  if (!src) {
    console.error('No source was provided for the Media component.');
    return (
      <Alert severity='error'>
        <AlertTitle>Media Error</AlertTitle>
        <p>No media source provided. Please check the media source and try again.</p>
      </Alert>
    );
  }

  const determineType = () => {
    if (type !== 'auto') return type;

    if (!src || typeof src !== 'string') return 'image';

    const extension = src.split('.').pop()?.toLowerCase();

    if (!extension) return 'image';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'].includes(extension)) {
      return 'image';
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return 'video';
    } else if (extension === 'pdf') {
      return 'pdf';
    }

    return 'image';
  };

  const mediaType = determineType();

  const mediaComponents = {
    image: (
      <ImageMedia
        src={src}
        alt={alt || 'Image'}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        className={className}
        style={style}
        priority={priority}
        sizes={sizes}
        fill={fill}
        quality={quality}
        onClick={onClick}
      />
    ),
    video: (
      <VideoMedia
        src={typeof src === 'string' ? src : null}
        videoWidth={typeof width === 'number' ? width : 768}
        videoHeight={typeof height === 'number' ? height : 432}
        playerWidth={playerWidth || '100%'}
      />
    ),
    pdf: (
      <PDFMedia
        src={typeof src === 'string' ? src : ''}
        width={pdfWidth || width || '100%'}
        height={pdfHeight || height || '600px'}
        style={style}
        className={className}
      />
    ),
  };

  return mediaComponents[mediaType] || null;
};

export default Media;
