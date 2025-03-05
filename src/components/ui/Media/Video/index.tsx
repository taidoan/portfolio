'use client';
import { getCDNURL } from '@/lib/utilities/getURLs';
const urlEndpoint = getCDNURL();

export interface VideoMediaProps {
  src: string | null | undefined;
  videoWidth?: number | null;
  playerWidth?: string | number;
  videoHeight?: number | null;
  style?: Record<string, string>;
}

/**
 * OptimizedVideo component is a reusable component that renders a video element with a poster image generated from the video file using ImageKit.
 * @param {VideoMediaProps} props
 * @param {string} [props.src] - The source URL of the video file.
 * @param {number} [props.videoWidth=640] - The width of the video in pixels.
 * @param {number} [props.videoHeight=360] - The height of the video in pixels.
 * @param {string} [props.playerWidth='100%'] - The width of the video player in a percentage.
 * @returns {JSX.Element} The rendered video element.
 * @see {@link https://imagekit.io/docs/video-transformation ImageKit Video Optimization}
 * @example
 * ```tsx
 * <OptimizedVideo src="video.mp4" />
 * ```
 */
export const VideoMedia = ({
  src,
  videoWidth,
  videoHeight,
  playerWidth,
  style = {},
}: VideoMediaProps) => {
  if (!src) {
    console.error('Video Media: No video source provided.');
    return null;
  }

  const extension = src.split('.').pop()?.toLowerCase();
  const supportedFormats = ['mp4', 'webm', 'ogg'];
  const mimeType = extension && supportedFormats.includes(extension) ? `video/${extension}` : null;

  if (!mimeType) {
    console.error(`Video Media: Unsupported video format for '${src}'`);
    return null;
  }

  const transformedVideoUrl = `${urlEndpoint}/${src}?tr=w-${videoWidth},h-${videoHeight},cm-pad_resize,bg-blurred`;

  return (
    <video
      controls
      preload='none'
      poster={`${urlEndpoint}/${src}/ik-thumbnail.jpg?tr=w-${videoWidth},h-${videoHeight},cm-pad_resize,bg-blurred`}
      width={playerWidth}
      style={style}
    >
      <source src={transformedVideoUrl} type={mimeType} />
      Your browser does not support the video tag.
    </video>
  );
};
