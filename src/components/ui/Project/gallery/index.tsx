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
        <AlertTitle>No Gallery Items</AlertTitle>No gallery were found for this project.
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
                  onClick={() => openLightbox(index)}
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

              {typeof item === 'object' && item.caption && (
                <figcaption className='project__gallery-caption'>
                  <RichText data={item.caption} />
                </figcaption>
              )}
            </CardBody>
          </Card>
        ))}
      </Carousel>
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={currentIndex}
          captions={gallery?.map(
            (item) =>
              (typeof item === 'object' && (item.caption as DefaultTypedEditorState)) || null,
          )}
        >
          {gallery?.map((item, index) => {
            if (typeof item === 'object') {
              if (item.mimeType?.includes('image')) {
                return (
                  <ImageMedia
                    key={index}
                    src={item.filename || null}
                    alt={item.alt || ''}
                    width={item.width}
                    height={item.height}
                  />
                );
              } else if (item.mimeType?.includes('video')) {
                return (
                  <VideoMedia
                    key={index}
                    src={item.filename || null}
                    playerWidth={item.width || ''}
                    videoHeight={item.height}
                    videoWidth={item.width}
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  />
                );
              }
            }
            return null;
          })}
        </Lightbox>
      )}
    </>
  );
};
