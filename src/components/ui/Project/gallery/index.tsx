import type { Project } from '@/payload-types';
import { ImageMedia } from '@components/ui/Media/Image';
import { VideoMedia } from '@components/ui/Media/Video';
import { Carousel } from '@components/ui/Carousel';
import { Card, CardBody } from '@/components/ui/Card';
import { Alert, AlertTitle } from '@/components/ui/Alert';

export type GalleryProps = {
  className?: string;
  media: Pick<Project, 'gallery'>;
  options: Pick<Project, 'galleryOptions'>;
};

export const ProjectGallery = ({ className, media, options }: GalleryProps) => {
  const { gallery } = media;
  const { galleryOptions } = options;

  if (!gallery || typeof gallery !== 'object' || !gallery.length) {
    return (
      <Alert severity='warning'>
        <AlertTitle>No Gallery Items</AlertTitle>No gallery were found for this project.
      </Alert>
    );
  }

  return (
    <Carousel
      className={className}
      direction={galleryOptions.direction}
      pagination={galleryOptions.pagination}
      wrapperClassName='project__gallery-wrapper'
      buttonNavigation={galleryOptions.buttonNavigation}
      slideSpacing={galleryOptions.slideSpacing}
      slidesPerView={galleryOptions.slidesPerView}
      autoHeight={galleryOptions.autoHeight}
      paginationType={galleryOptions.paginationType}
      paginationColor={galleryOptions.paginationColor || 'accent'}
      loop={galleryOptions.loop}
      autoPlay={galleryOptions.autoPlay}
      keyboardControls={galleryOptions.keyboardControls}
    >
      {gallery?.map((item, index) => (
        <Card key={index}>
          <CardBody padding='base'>
            {typeof item === 'object' && item.mimeType?.includes('image') && (
              <ImageMedia
                src={item.filename || null}
                alt={item.alt || ''}
                width={item.width}
                height={item.height}
                className='project__gallery-item'
              />
            )}

            {typeof item === 'object' && item.mimeType?.includes('video') && (
              <VideoMedia
                src={item.filename || null}
                playerWidth={item.width || ''}
                videoHeight={item.height}
                videoWidth={item.width}
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              />
            )}
          </CardBody>
        </Card>
      ))}
    </Carousel>
  );
};
