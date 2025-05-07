import clsx from 'clsx';
import embedStyle from './../style.module.scss';

export type EmbeddedMediaProps = {
  src: string;
  source: 'youtube' | undefined;
  style?: React.CSSProperties;
};

export const EmbedMedia = ({ src, source, style }: EmbeddedMediaProps) => {
  const isYoutube = source === 'youtube';
  let urlToUse = src;

  if (isYoutube) {
    if (!urlToUse.includes('youtube.com')) {
      return 'Please provide a valid YouTube URL.';
    }

    if (urlToUse.includes('youtu.be')) {
      urlToUse = urlToUse.replace(
        'https://www.youtu.be/',
        'https://www.youtube-nocookie.com/embed/',
      );
    }

    if (urlToUse.includes('youtube.com/watch?v=')) {
      urlToUse = urlToUse.replace(
        'https://www.youtube.com/watch?v=',
        'https://www.youtube-nocookie.com/embed/',
      );
    }
  } else {
    return 'Please provide a source from YouTube.';
  }

  return (
    <div className={clsx(embedStyle.embedContainer)} style={style}>
      <iframe
        width='560'
        height='315'
        src={urlToUse}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      />
    </div>
  );
};
