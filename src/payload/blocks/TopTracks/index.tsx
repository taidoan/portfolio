import type { TopTracksBlockProps } from '@/payload-types';
import { Carousel } from '@/components/ui/Carousel';
import { SpotifyTopTracks } from '@/components/features/SpotifyTopTracks';

export type Props = {
  className?: string;
} & TopTracksBlockProps;

export const TopTracksBlock = async ({
  className,
  container = 'none',
  numberOfTracks,
  type,
  loop,
  slideSpacing,
  focus,
}: Props) => {
  const renderTracks = <SpotifyTopTracks numberOfTracks={numberOfTracks} container={container} />;

  if (type === 'carousel') {
    return (
      <Carousel
        className={className}
        direction='vertical-scroll'
        slidesPerView={3}
        slidesToScroll={1}
        loop={loop === 'loop'}
        focus={focus === 'focused'}
        buttonNavigation={false}
        pagination={true}
        paginationType='progress'
        slideSpacing={slideSpacing}
      >
        {renderTracks}
      </Carousel>
    );
  }

  return (
    <div className={className}>
      <SpotifyTopTracks numberOfTracks={numberOfTracks} container={container} />
    </div>
  );
};
