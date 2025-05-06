import type { RelatedProjectsBlockProps } from '@/payload-types';
import type { CardData } from '@/components/ui/Card/types';

import { clsx } from 'clsx';
import style from './style.module.scss';
import { queryRelatedProjects } from '@/lib/utilities/queries/queryRelatedProjects';

import { Card, CardBody, CardTitle, CardImage, CardContent } from '@/components/ui/Card';
import { Carousel } from '@/components/ui/Carousel';
import { RichText } from '@/components/ui/RichText';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { LinksBlock } from '../Links';

export type Props = {
  className?: string;
} & RelatedProjectsBlockProps;

export const RelatedProjectsBlock = async ({
  className,
  relatedCollection,
  relatedCategory,
  numberOfRelatedItems,
  showIntro,
  showLink,
  introContent,
  link,
}: Props) => {
  const data = await queryRelatedProjects({
    collection: relatedCollection,
    category: relatedCategory,
    items: numberOfRelatedItems,
  });

  const projects = relatedCollection === 'projects' ? (data as CardData[]) : (data as CardData[]);

  return (
    <>
      {showIntro && introContent ? (
        <div
          className={clsx('text-align__left', {
            'col-span-11': showLink,
            'col-span-16': !showLink,
          })}
        >
          <RichText converters={headingConverter} data={introContent} />
        </div>
      ) : (
        <Alert
          severity='warning'
          className={clsx({ 'col-span-11': showLink, 'col-span-16': !showLink })}
        >
          <AlertTitle>Missing Intro Content</AlertTitle>No intro content was provided.
        </Alert>
      )}
      {showIntro && showLink && link && (
        <LinksBlock
          link={link}
          blockType='links'
          className={clsx('col-span-5', 'justify-self__end', link.className)}
        />
      )}
      <section className={clsx(className, style['related-projects'], 'section')}>
        {projects.length > 0 && (
          <Carousel
            disableAt={'(min-width: 64em)'}
            pagination
            buttonNavigation
            keyboardControls
            className={clsx(style['related-projects__container'], 'col-span-16')}
            wrapperClassName={clsx(
              style['related-projects__wrapper'],
              style[`related-projects__wrapper--grid-cols-${numberOfRelatedItems}`],
            )}
          >
            {projects.map((item) => (
              <Card data={item} key={item.id} relation='projects' href={`${item.url}`}>
                <CardBody>
                  <CardImage align='top' borderRadius='top' />
                  <CardContent>
                    <CardTitle />
                    {relatedCollection === 'projects' && 'details' in item && (
                      <p>{item.details?.type}</p>
                    )}
                  </CardContent>
                </CardBody>
              </Card>
            ))}
          </Carousel>
        )}
      </section>
    </>
  );
};
