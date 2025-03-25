import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import { draftMode } from 'next/headers';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { generateMeta } from '@/lib/utilities/generateMeta';
import clsx from 'clsx';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { Redirects } from '@/components/features/Redirects';
import { RichText } from '@/components/ui/RichText';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { SlugPageHero } from '@/blocks/Hero/SlugPage';
import { Media } from '@components/ui/Media';
import { Card, CardBody } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';
import { Carousel } from '@/components/ui/Carousel';
import { RenderBlocks } from '@/blocks/RenderBlocks';

export type Args = {
  params: Promise<{ slug: string }>;
};

const ServicePage = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  const url = '/services/' + slug;
  const page: RequiredDataFromCollectionSlug<'services'> | null = await queryPageBySlug({
    slug,
    collection: 'services',
  });

  if (!page) return <Redirects url={url} />;

  const { hero, introContent, image, items, pageBlocks } = page;
  const breadcrumbs = hero?.breadcrumbs;

  const pageIds =
    breadcrumbs?.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await queryBreadcrumbs(pageIds);

  return (
    <>
      <Redirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <SlugPageHero heroData={page} breadcrumbsData={breadcrumbsData} />
      <section className={clsx('section', 'text-align__left')}>
        <div className={'section__wrapper'}>
          {introContent && (
            <RichText
              converters={headingConverter}
              data={introContent}
              className={clsx('col-span-10', 'align-self__center')}
            />
          )}
          <div className={'col-span-1'}></div>
          {image && typeof image === 'object' && (
            <div className={clsx('col-span-5', 'align-self__center', 'service__image-container')}>
              <Media
                src={image.filename}
                alt={image.alt || ''}
                width={image.width ? image.width : undefined}
                height={image.height ? image.height : undefined}
                className='service__image'
              />
            </div>
          )}
        </div>
      </section>
      <Card className={clsx('service__section', 'text-align__left')}>
        <CardBody padding='base'>
          <Carousel
            disableAt={'(min-width: 64em)'}
            pagination
            buttonNavigation
            slideClassName='service__item-container'
            keyboardControls
            autoHeight
            loop
          >
            {items?.length > 0 &&
              items.map((item, index) => {
                const itemImage = item.image;
                return (
                  <div className='service__item' key={index}>
                    {itemImage && typeof itemImage === 'object' && (
                      <Media
                        src={itemImage.filename}
                        alt={itemImage.alt || ''}
                        width={itemImage.width ? itemImage.width : undefined}
                        height={itemImage.height ? itemImage.height : undefined}
                        className='service__item-image'
                      />
                    )}
                    <div className='service__item-content'>
                      <h2 className='service__item-title'>{item.title}</h2>
                      <Divider
                        type='content'
                        color='light-grey'
                        className='service__item-divider'
                      />
                      <RichText data={item.description} />
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </CardBody>
      </Card>
      {pageBlocks && <RenderBlocks blocks={pageBlocks} />}
    </>
  );
};

export default ServicePage;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = 'home' } = await paramsPromise;
  const page = await queryPageBySlug({ slug, collection: 'services' });

  return generateMeta({ doc: page });
};
