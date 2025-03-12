'use client';
import Image, { ImageLoaderProps } from 'next/image';
import { getCDNURL } from '@/lib/utilities/getURLs';
import { Alert, AlertTitle } from '@components/ui/Alert';
import s from './../style.module.scss';

const urlEndpoint = getCDNURL();

export interface ImageMedia {
  src: string | null;
  alt: string;
  width?: number | null;
  height?: number | null;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  style?: Record<string, string>;
  onClick?: () => void;
}

const imageKitLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const params = [`w-${width}`, `q-${quality || 80}`, 'f-auto', 'tr-progressive'].join(',');

  return `${urlEndpoint}/tr:${params}/${src}`;
};

/**
 * OptimizedImage component is a reusable component that extends the NextJS image component with ImageKit optimizations.
 * @param {ImageMedia} props
 * @param {string} [props.src] - The source URL of the image.
 * @param {string} [props.alt] - The alternative text for the image.
 * @param {number} [props.width] - The width of the image.
 * @param {number} [props.height] - The height of the image.
 * @param {string} [props.className] - The class name for the image element.
 * @param {boolean} [props.priority=false] - Whether to prioritize the image for high-quality display.
 * @param {string} [props.sizes='100vw'] - The sizes attribute for the image element.
 * @param {boolean} [props.fill=false] - Whether to fill the available space.
 * @param {number} [props.quality=80] - The quality of the image.
 * @returns {JSX.Element} The rendered image element.
 * @see {@link https://imagekit.io/features/image-optimization ImageKit Image Optimization}
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/image-optimization NextJS Image Optimization}
 * @example
 * ```tsx
 * <OptimizedImage src="image.jpg" />
 * ```
 */
export const ImageMedia = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  fill = false,
  quality = 80,
  style = {},
  onClick,
}: ImageMedia) => {
  const placeholderBlur =
    'data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABwAQCdASoKAAYAB0CWJaACdAFAAAD+2iaVorpfvri5shvAAAA=';

  if (src === null) {
    return (
      <Alert severity='error'>
        <AlertTitle>Missing image source</AlertTitle>
        <p>The image source is missing. Please check the source and try again.</p>
      </Alert>
    );
  }

  if (alt === null) {
    return (
      <Alert severity='warning'>
        <AlertTitle>Missing image alt text</AlertTitle>
        <p>The image alt text is missing. Please check the image and try again.</p>
      </Alert>
    );
  }

  return (
    <Image
      loader={imageKitLoader}
      src={src as string}
      alt={alt}
      className={`${className} ${s.optimizedImage}`}
      priority={priority}
      sizes={sizes}
      {...(fill ? { fill: true } : { width: width ?? 100, height: height ?? 100 })}
      quality={quality}
      style={style}
      placeholder='blur'
      blurDataURL={placeholderBlur}
      onClick={onClick}
    />
  );
};
