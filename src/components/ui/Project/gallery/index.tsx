'use client';

import { useState, Fragment } from 'react';
import type { Project } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { ImageMedia } from '@components/ui/Media/Image';
import { VideoMedia } from '@components/ui/Media/Video';
import { RichText } from '@components/ui/RichText';
import { Carousel } from '@components/ui/Carousel';
import { Card, CardBody } from '@/components/ui/Card';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { Lightbox } from '@/components/ui/Lightbox';

export type GalleryProps = {
  className?: string;
  media: Pick<Project, 'gallery'>;
  options: Pick<Project, 'galleryOptions'>;
};

export const ProjectGallery = ({ className, media, options }: GalleryProps) => {
  const { gallery } = media;
  const { galleryOptions } = options;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!gallery || typeof gallery !== 'object' || !gallery.length) {
    return (
      <Alert severity='warning'>
        <AlertTitle>No Gallery Items</AlertTitle>
        <p>No gallery were found for this project.</p>
      </Alert>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Carousel
        className={className}
        direction={galleryOptions.direction}
        pagination={galleryOptions.pagination}
        wrapperClassName='project__gallery-wrapper'
        buttonNavigation={galleryOptions.buttonNavigation}
        slideSpacing={galleryOptions.slideSpacing}
        slidesPerView={galleryOptions.slidesPerView}
        slideClassName='project__gallery__slide'
        autoHeight={galleryOptions.autoHeight}
        paginationType={galleryOptions.paginationType}
        paginationColor={galleryOptions.paginationColor || 'accent'}
        loop={galleryOptions.loop}
        autoPlay={galleryOptions.autoPlay}
        keyboardControls={galleryOptions.keyboardControls}
        showPaginationCounter={true}
        controlsClassName='project__gallery__controls'
      >
        {gallery?.map((item, index) => {
          const { media } = item;

          return (
            <Card key={index}>
              <CardBody padding='base'>
                {media && typeof media === 'object' && media.mimeType?.includes('image') && (
                  <ImageMedia
                    src={media.filename || null}
                    alt={media.alt || ''}
                    width={media.width}
                    height={media.height}
                    onClick={() => openLightbox(index)}
                    className='project__gallery-item'
                  />
                )}

                {media && typeof media === 'object' && media.mimeType?.includes('video') && (
                  <VideoMedia
                    src={media.filename || null}
                    playerWidth={media.width || ''}
                    videoHeight={media.height || 432}
                    videoWidth={media.width || 768}
                    style={{ aspectRatio: `${media.width} / ${media.height}` }}
                  />
                )}

                {typeof item === 'object' && item.showCaption && item.caption && (
                  <figcaption className='project__gallery-caption'>
                    <RichText data={item.caption} />
                  </figcaption>
                )}
              </CardBody>
            </Card>
          );
        })}
      </Carousel>
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={currentIndex}
          captions={gallery?.map(
            (item) =>
              (typeof item === 'object' &&
                item.showCaption &&
                (item.caption as DefaultTypedEditorState)) ||
              null,
          )}
        >
          {gallery?.map((item, index) => {
            const { media } = item;

            if (!media || typeof media !== 'object')
              return (
                <Alert severity='error' key={index}>
                  <AlertTitle>Invalid Media</AlertTitle>
                  <p>The media for this item is missing or invalid.</p>
                </Alert>
              );

            if (media.mimeType?.includes('image')) {
              return (
                <ImageMedia
                  key={index}
                  src={media.filename || null}
                  alt={media.alt || ''}
                  width={media.width}
                  height={media.height}
                />
              );
            } else if (media.mimeType?.includes('video')) {
              return (
                <VideoMedia
                  key={index}
                  src={media.filename || null}
                  playerWidth={media.width || ''}
                  videoHeight={media.height || 432}
                  videoWidth={media.width || 768}
                  style={{ aspectRatio: `${media.width} / ${media.height}` }}
                />
              );
            }
          })}
        </Lightbox>
      )}
    </>
  );
};
