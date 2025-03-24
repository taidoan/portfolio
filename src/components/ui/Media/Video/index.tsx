'use client';
import { getCDNURL } from '@/lib/utilities/getURLs';
import { Alert, AlertTitle } from '@/components/ui/Alert';
const urlEndpoint = getCDNURL();

export interface VideoMediaProps {
  src: string | null | undefined;
  videoWidth?: number;
  playerWidth?: string | number;
  videoHeight?: number;
  style?: React.CSSProperties;
}

/**
 * VideoMedia component is a reusable component that renders a video element with a poster image generated from the video file using ImageKit.
 * @param {VideoMediaProps} props
 * @param {string} [props.src] - The source URL of the video file.
 * @param {number} [props.videoWidth=640] - The width of the video in pixels.
 * @param {number} [props.videoHeight=360] - The height of the video in pixels.
 * @param {string} [props.playerWidth='100%'] - The width of the video player in a percentage.
 * @returns {JSX.Element} The rendered video element.
 * @see {@link https://imagekit.io/docs/video-transformation ImageKit Video Optimization}
 * @example
 * ```tsx
 * <VideoMedia src="video.mp4" />
 * ```
 */
export const VideoMedia = ({
  src,
  videoWidth = 768,
  videoHeight = 432,
  playerWidth,
  style = {},
}: VideoMediaProps) => {
  if (!src) {
    console.error('Video Media: No video source provided.');
    return (
      <Alert severity='error'>
        <AlertTitle>Video Media</AlertTitle>
        No video source provided.
      </Alert>
    );
  }

  const extension = src.split('.').pop()?.toLowerCase();
  const supportedFormats = ['mp4', 'webm', 'ogg'];
  const mimeType = extension && supportedFormats.includes(extension) ? `video/${extension}` : null;

  if (!mimeType) {
    console.error(`Video Media: Unsupported video format for '${src}'`);
    return (
      <Alert severity='error'>
        <AlertTitle>Video Media</AlertTitle>
        Unsupported video format for {src}.
      </Alert>
    );
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
      <Alert severity='warning'>Your browser does not support the video tag.</Alert>
    </video>
  );
};
